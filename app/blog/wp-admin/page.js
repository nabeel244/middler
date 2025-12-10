'use client';

export default function WordPressAdmin() {
  const adminUrl = 'https://primary-production-bf78.up.railway.app/wp-admin';

  return (
    <div className="w-full h-screen">
      <iframe
        src={adminUrl}
        className="w-full h-full border-0"
        title="WordPress Admin"
      />
    </div>
  );
}