import { NextResponse } from 'next/server';

export async function GET() {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json({ error: 'Missing Unsplash access key' }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=student&client_id=${accessKey}`
    );
    const data = await response.json();
    return NextResponse.json({ imageUrl: data.urls.regular });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
}
