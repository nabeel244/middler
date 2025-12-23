'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {post.featured_media && (
              <img 
                src={post.featured_media} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                <a 
                  href={`https://primary-production-bf78.up.railway.app/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                >
                  {post.title}
                </a>
              </h2>
              <div 
                className="text-gray-600 mb-4"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span>{post.author}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {posts.length === 0 && !loading && (
        <div className="text-center text-gray-600">
          No blog posts found.
        </div>
      )}
    </div>
  );
}