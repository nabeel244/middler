'use client';

export default function BlogPage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="/api/proxy"
        className="w-full h-full border-0"
        title="Blog"
      />
    </div>
  );
}