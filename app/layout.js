import { Poppins } from 'next/font/google';
import Script from 'next/script';
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
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-T72TYPR1EE"
            strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-T72TYPR1EE');
              `}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
