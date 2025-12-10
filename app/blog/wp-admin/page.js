'use client';
import { useEffect } from 'react';

export default function WordPressAdmin() {
  useEffect(() => {
    window.location.href = '/blog/wp-login.php?redirect_to=' + encodeURIComponent('https://primary-production-bf78.up.railway.app/wp-admin/') + '&reauth=1';
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to WordPress Login...</p>
    </div>
  );
}