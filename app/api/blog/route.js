import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = 'https://primary-production-bf78.up.railway.app/wp-json/wp/v2';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const per_page = searchParams.get('per_page') || '10';
    
    const response = await fetch(`${WORDPRESS_API_URL}/posts?page=${page}&per_page=${per_page}&_embed`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts = await response.json();
    
    return NextResponse.json({
      posts: posts.map(post => ({
        id: post.id,
        title: post.title.rendered,
        content: post.content.rendered,
        excerpt: post.excerpt.rendered,
        slug: post.slug,
        date: post.date,
        featured_media: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
        categories: post._embedded?.['wp:term']?.[0] || [],
        author: post._embedded?.author?.[0]?.name || 'Admin'
      }))
    });
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}