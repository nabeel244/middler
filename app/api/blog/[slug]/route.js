import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = 'https://primary-production-bf78.up.railway.app/wp-json/wp/v2';

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    
    const response = await fetch(`${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }

    const posts = await response.json();
    
    if (posts.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const post = posts[0];
    
    return NextResponse.json({
      id: post.id,
      title: post.title.rendered,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
      slug: post.slug,
      date: post.date,
      featured_media: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      categories: post._embedded?.['wp:term']?.[0] || [],
      author: post._embedded?.author?.[0]?.name || 'Admin'
    });
  } catch (error) {
    console.error('Error fetching WordPress post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}