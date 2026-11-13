import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rateLimit';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

// Allowed MIME types mapped to safe extensions
const ALLOWED_MIME_TYPES: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/avif': '.avif',
};

// 5 MB limit
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const targetFolder = (formData.get('folder') as string) || 'portfolio';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided in upload request' },
        { status: 400 }
      );
    }

    // 1. Authorization check based on target destination
    if (targetFolder === 'portfolio' || targetFolder === 'brand') {
      const session = await getSession();
      if (!session) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized: Admin authentication required for portfolio uploads' },
          { status: 401 }
        );
      }
    } else if (targetFolder === 'enquiries') {
      // Rate limiting for public enquiry uploads
      const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
      const rateLimitCheck = checkRateLimit(`upload_enquiry_${ip}`, 10, 600000); // 10 uploads per 10 mins
      if (!rateLimitCheck.allowed) {
        return NextResponse.json(
          { success: false, error: 'Upload rate limit exceeded. Please wait a few minutes before trying again.' },
          { status: 429 }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid destination folder' },
        { status: 400 }
      );
    }

    // 2. MIME type validation
    const fileMime = file.type.toLowerCase();
    const extension = ALLOWED_MIME_TYPES[fileMime];
    if (!extension) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported file type (${fileMime || 'unknown'}). Only JPEG, PNG, WebP, and AVIF images are accepted.`,
        },
        { status: 400 }
      );
    }

    // 3. Size validation
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File is too large (${(file.size / (1024 * 1024)).toFixed(2)} MB). Maximum allowed size is 5 MB.`,
        },
        { status: 400 }
      );
    }

    // 4. Generate cryptographically safe non-guessable filename
    const randomName = crypto.randomUUID();
    const safeFilename = `${randomName}${extension}`;

    // 5. Ensure target directory exists safely inside public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', targetFolder);
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, safeFilename);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${targetFolder}/${safeFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: safeFilename,
      size: file.size,
      mimeType: fileMime,
    });
  } catch (error: unknown) {
    console.error('File upload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Server encountered an error saving the uploaded file.',
      },
      { status: 500 }
    );
  }
}
