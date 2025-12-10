'use client';

export default function BlogPage() {
  const blogUrl = process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://middler.com/blog'
    : 'http://localhost/blog';

  return (
    <div className="w-full h-screen">
      <iframe
        src={blogUrl}
        className="w-full h-full border-0"
        title="Blog"
      />
    </div>
  );
}