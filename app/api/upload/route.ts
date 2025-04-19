import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('images');  // generic name now!

    const uploadedPaths: string[] = [];

    for (const file of files) {
      if (file instanceof File) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Detect if it's a video or image
        const isVideo = file.type.startsWith('video/');

        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              resource_type: isVideo ? 'video' : 'image',  // << important!
              folder: 'thaseen',
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );

          stream.end(buffer);
        });

        uploadedPaths.push((uploadResult as any).secure_url);
      }
    }

    return NextResponse.json({ success: true, urls: uploadedPaths }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Upload failed', error }, { status: 500 });
  }
}
