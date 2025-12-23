export async function generateMetadata({ params }) {
  const defaultMeta = {
    title: 'Blog Post - Middler',
    description: 'Read our latest blog post about painting and home improvement.',
  };

  try {
    const response = await fetch(`https://primary-production-bf78.up.railway.app/wp-json/wp/v2/posts?slug=${params.slug}&_embed`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) return defaultMeta;

    const posts = await response.json();
    if (posts.length === 0) return defaultMeta;

    const post = posts[0];
    const title = post.title.rendered;
    const description = post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160);
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return {
      title: `${title} - Middler Blog`,
      description,
      openGraph: {
        title,
        description,
        url: `https://middler.com/blog/${post.slug}`,
        type: 'article',
        images: featuredImage ? [{ url: featuredImage }] : [],
      },
    };
  } catch (error) {
    return defaultMeta;
  }
}