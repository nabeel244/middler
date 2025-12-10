'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function WordPressLogin() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const redirect_to = searchParams.get('redirect_to') || '';
    const reauth = searchParams.get('reauth') || '';
    
    let loginUrl = 'https://primary-production-bf78.up.railway.app/wp-login.php';
    
    if (redirect_to) {
      loginUrl += `?redirect_to=${encodeURIComponent(redirect_to)}`;
      if (reauth) {
        loginUrl += `&reauth=${reauth}`;
      }
    }
    
    window.location.href = loginUrl;
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to WordPress Login...</p>
    </div>
  );
}