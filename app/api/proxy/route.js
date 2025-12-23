import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '';
  
  try {
    const response = await fetch(`https://primary-production-bf78.up.railway.app${path}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Middler-Proxy/1.0)',
      },
    });
    
    if (!response.ok) {
      return new NextResponse('Not Found', { status: 404 });
    }
    
    let content = await response.text();
    
    // Replace Railway URLs with middler.com URLs
    content = content.replace(/https:\/\/primary-production-bf78\.up\.railway\.app/g, 'https://middler.com');
    content = content.replace(/primary-production-bf78\.up\.railway\.app/g, 'middler.com');
    
    const contentType = response.headers.get('content-type') || 'text/html';
    
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'X-Frame-Options': 'SAMEORIGIN',
      },
    });
  } catch (error) {
    return new NextResponse('Error loading content', { status: 500 });
  }
}