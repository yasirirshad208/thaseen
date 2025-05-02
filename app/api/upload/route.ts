import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  timeout: 60000
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('images');
    const uploadedPaths: string[] = [];

    for (const file of files) {
      if (file instanceof File) {
        const isVideo = file.type.startsWith('video/');
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(new Uint8Array(bytes));

        let finalBuffer: Buffer = buffer;
        if (!isVideo) {
          finalBuffer = await sharp(buffer)
          .resize({ width: 1280 })
          .jpeg({ quality: 60, progressive: true, mozjpeg: true }) // use mozjpeg
          .toBuffer();
        
        }

        const base64Str = finalBuffer.toString('base64');
        const dataUrl = `data:${file.type};base64,${base64Str}`;

        const uploadResult = await cloudinary.uploader.upload(`data:${file.type};base64,${finalBuffer.toString('base64')}`, {
          resource_type: isVideo ? 'video' : 'image',
          folder: 'thaseen',
        });

        uploadedPaths.push(uploadResult.secure_url);
      }
    }

    return NextResponse.json({ success: true, urls: uploadedPaths }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, message: 'Upload failed', error }, { status: 500 });
  }
}
