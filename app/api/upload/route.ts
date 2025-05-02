import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

async function uploadToCloudinaryWithTimeout(buffer: Buffer, isVideo: boolean, timeoutMs = 20000) {
  return Promise.race([
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: isVideo ? 'video' : 'image',
          folder: 'thaseen',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer);
    }),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Upload timed out')), timeoutMs)
    )
  ]);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('images');

    const uploadedPaths: string[] = [];

    for (const file of files) {
      if (file instanceof File) {
        try {
          const isVideo = file.type.startsWith('video/');

          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(new Uint8Array(bytes)); // ✅ No TS error
          
          let finalBuffer: Buffer = buffer;

          // Compress images using sharp (only for images, not videos)
          if (!isVideo) {
            finalBuffer = await sharp(buffer)
              .resize({ width: 1280 })
              .jpeg({ quality: 75 })
              .toBuffer();
          }

          const uploadResult = await uploadToCloudinaryWithTimeout(finalBuffer, isVideo, 20000);
          uploadedPaths.push((uploadResult as any).secure_url);

        } catch (err) {
          console.error(`Failed to upload ${file.name}:`, err);
        }
      }
    }

    return NextResponse.json({ success: true, urls: uploadedPaths }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Upload failed', error }, { status: 500 });
  }
}
