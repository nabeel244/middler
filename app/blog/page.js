'use client';

export default function BlogPage() {
  const blogUrl = 'https://primary-production-bf78.up.railway.app';

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