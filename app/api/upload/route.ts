import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdirSync, existsSync } from 'fs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('images');

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    const uploadedPaths: string[] = [];

    for (const file of files) {
      if (file instanceof File) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const ext = file.name.split('.').pop();
        const filename = `${uuidv4()}.${ext}`;
        const filepath = path.join(uploadDir, filename);

        await writeFile(filepath, buffer);
        uploadedPaths.push(`/uploads/${filename}`);
      }
    }

    return NextResponse.json({ success: true, urls: uploadedPaths }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Image upload failed', error },
      { status: 500 }
    );
  }
}
