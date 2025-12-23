import { redirect } from 'next/navigation';

export default function BlogPage() {
  // SEO friendly redirect to WordPress blog
  redirect('https://primary-production-bf78.up.railway.app');
}