import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://primary-production-bf78.up.railway.app/wp-json/wp/v2/posts?_embed&per_page=10');
    
    if (!response.ok) {
      return NextResponse.json({ posts: [] });
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
        author: post._embedded?.author?.[0]?.name || 'Admin'
      }))
    });
  } catch (error) {
    return NextResponse.json({ posts: [] });
  }
}