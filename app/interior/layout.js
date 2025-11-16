import Script from 'next/script';

export const metadata = {
  title: 'Interior Paint Calculator | House Paint Estimate Cost - Middler',
  description: 'Get accurate interior paint cost estimates with Middler\'s calculator. Plan your interior painting project with detailed cost breakdown for paint, materials & labor.',
};

export default function InteriorLayout({ children }) {
  return (
    <>
      {/* Google Maps API Script for Interior page */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_ADDRESS_VALIDATION_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
      />
      {children}
    </>
  );
}