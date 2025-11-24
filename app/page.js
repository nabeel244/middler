import PageLayout from "@/components/layouts/PageLayout";

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
  return <PageLayout pageType="home" />;
};

export default Home;
