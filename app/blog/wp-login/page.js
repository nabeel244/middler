import { redirect } from 'next/navigation';

export default function WordPressLogin() {
  // Redirect to WordPress login
  redirect('https://primary-production-bf78.up.railway.app/wp-login.php');
}