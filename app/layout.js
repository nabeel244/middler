import { Poppins } from 'next/font/google';
import './globals.css';
import Providers from './Providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <meta name="google-site-verification" content="cXkEsP_rWBJOqS_x8q9XsG3hfwXWJgC9Wvnt93V-PcU" />
      <body className={`${poppins.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
