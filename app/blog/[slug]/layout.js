const WORDPRESS_API_URL = 'https://primary-production-bf78.up.railway.app/wp-json/wp/v2';

export async function generateMetadata({ params }) {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/posts?slug=${params.slug}&_embed`);
    
    if (!response.ok) {
      return {
        title: 'Post Not Found - Middler Blog',
        description: 'The requested blog post could not be found.',
      };
    }

    const posts = await response.json();
    
    if (posts.length === 0) {
      return {
        title: 'Post Not Found - Middler Blog',
        description: 'The requested blog post could not be found.',
      };
    }

    const post = posts[0];
    const title = post.title.rendered;
    const description = post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160);
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return {
      title: `${title} - Middler Blog`,
      description,
      keywords: `${title}, painting, paint estimator, home improvement`,
      openGraph: {
        title,
        description,
        url: `https://middler.com/blog/${post.slug}`,
        type: 'article',
        images: featuredImage ? [{ url: featuredImage }] : [],
        publishedTime: post.date,
        modifiedTime: post.modified,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: featuredImage ? [featuredImage] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post - Middler',
      description: 'Read our latest blog post about painting and home improvement.',
    };
  }
}