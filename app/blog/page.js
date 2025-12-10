'use client';

export default function BlogPage() {
  const blogUrl = process.env.NODE_ENV === 'production' 
    ? 'https://primary-production-b4a4.up.railway.app'
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