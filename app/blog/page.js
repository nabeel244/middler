'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogPage() {
  const blogUrl = 'https://primary-production-bf78.up.railway.app';
  const router = useRouter();

  useEffect(() => {
    const iframe = document.querySelector('iframe[title="Blog"]');
    
    const handleIframeLoad = () => {
      try {
        // Monitor iframe URL changes
        const checkUrlChange = () => {
          try {
            const iframeWindow = iframe.contentWindow;
            const iframePath = iframeWindow.location.pathname;
            
            if (iframePath && iframePath !== '/') {
              // Update parent URL to match iframe content
              const newUrl = `/blog${iframePath}`;
              window.history.replaceState({}, '', newUrl);
            } else {
              // Default blog page
              window.history.replaceState({}, '', '/blog');
            }
          } catch (e) {
            // CORS restriction - can't access iframe URL
          }
        };
        
        // Check URL periodically
        const urlChecker = setInterval(checkUrlChange, 1000);
        
        // Cleanup interval on component unmount
        return () => clearInterval(urlChecker);
      } catch (error) {
        console.log('Cannot access iframe content due to CORS');
      }
    };

    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
    };
  }, []);

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