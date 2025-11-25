import PageLayout from "@/components/layouts/PageLayout";
import Script from 'next/script';

// Home Page Product Schema
const homeProductSchema = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Paint Cost Estimate Calculator",
  "image": "https://middler.com/images/mobile_mockup2.webp",
  "description": "Plan your painting project with confidence. Middler's paint calculator gives detailed cost estimates for interior & exterior house painting, including paint, material & labor.",
  "brand": {
    "@type": "Brand",
    "name": "Middler"
  }
};

export const metadata = {
  title: 'Paint Calculator | House Paint Estimate Cost - Middler',
  description: 'Plan your painting project with confidence. Middler\'s paint calculator gives detailed cost estimates for interior & exterior house painting, including paint, material & labor.',
  openGraph: {
    siteName: 'Middler',
    title: 'Paint Calculator | House Paint Estimate Cost - Middler',
    description: 'Plan your painting project with confidence. Middler\'s paint calculator gives detailed cost estimates for interior & exterior house painting, including paint, material & labor.',
    url: 'https://middler.com/',
    type: 'website',
    images: ['https://middler.com/images/mobile_mockup2.webp']
  },
  twitter: {
    card: 'summary',
    title: 'Paint Calculator | House Paint Estimate Cost - Middler',
    description: 'Plan your painting project with confidence. Middler\'s paint calculator gives detailed cost estimates for interior & exterior house painting, including paint, material & labor.',
    images: ['https://middler.com/images/mobile_mockup2.webp']
  },
  alternates: {
    canonical: 'https://middler.com/'
  },
  robots: {
    index: true,
    follow: true
  }
};

const Home = () => {
  return (
    <>
      <Script
        id="home-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeProductSchema) }}
      />
      <PageLayout pageType="home" />
    </>
  );
};

export default Home;
