"use client";
import Brands from "@/components/home/Brands";
import Estimate from "@/components/home/Estimate";
import OurProcess from "@/components/home/OurProcess";
import WhoUseMiddler from "@/components/home/WhoUseMiddler";
import Cta from "@/components/layouts/Cta";
import Cta2 from "@/components/layouts/Cta2";
import Footer from "@/components/layouts/Footer";
import GetStarted from "@/components/layouts/GetStarted";
import Header from "@/components/layouts/Header";
import Hero from "@/components/layouts/Hero";
import TextSlider from "@/components/layouts/TextSlider";
import GiftPopup from "@/components/modals/GiftPopup";
import ToastProvider from "@/components/ToastProvider";
import OpenPopup from "@/components/ui/OpenPopup";
import { useEffect, useState } from "react";

const Home = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  useEffect(() => {
    const saved = sessionStorage.getItem("noEmailEntered");
    if (saved) {
      setShowPopUp(saved);
      sessionStorage.removeItem("noEmailEntered");
    } else {
    }
  }, []);

    // Organization Schema Data
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Middler",
        "alternateName": "Middler",
        "url": "https://middler.com/",
        "logo": "https://middler.com/images/logo.png",
        "sameAs": [
            "https://www.linkedin.com/company/middler/",
            "https://www.instagram.com/middler_com/"
        ]
    };

    // Product Schema Data
    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Paint Cost Estimate Calculator",
        "image": "https://middler.com/images/mobile_mockup2.png",
        "description": "Plan your painting project with confidence. Middler's paint calculator gives detailed cost estimates for interior & exterior house painting, including paint, material & labor.",
        "brand": {
            "@type": "Brand",
            "name": "Middler"
        }
    };

  return (
    <>
        <head>
        <title>Paint Calculator | House Paint Estimate Cost - Middler</title>
        <meta property="og:site_name" content="Middler" />

        <meta name="robots" content="index, follow" />

        <meta name="description"
              content="Plan your painting project with confidence. Middler’s paint calculator gives detailed cost estimates for interior & exterior house painting, including paint, material & labor." />

        <meta property="og:title" content="Paint Calculator | House Paint Estimate Cost - Middler" />

        <meta property="og:type" content="website" />

        <meta property="og:url" content="https://middler.com/" />

        <meta property="og:image" content="https://middler.com/images/mobile_mockup2.png" />

        <meta property="og:description"
              content="Plan your painting project with confidence. Middler’s paint calculator gives detailed cost estimates for interior & exterior house painting, including paint, material & labor." />

        <meta name="twitter:card" content="summary" />

        <meta name="twitter:url" content="https://middler.com/" />

        <meta name="twitter:title" content="Paint Calculator | House Paint Estimate Cost - Middler" />

        <meta name="twitter:description"
              content="Plan your painting project with confidence. Middler’s paint calculator gives detailed cost estimates for interior & exterior house painting, including paint, material & labor." />

        <meta name="twitter:image" content="https://middler.com/images/mobile_mockup2.png" />

        <link rel="canonical" href="https://middler.com/" />

        {/* Organization Schema Script */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationSchema)
            }}
        />

        {/* Product Schema Script */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(productSchema)
            }}
        />
        </head>

        <Header />

      {showPopUp && (
        <GiftPopup
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          isMainPage={true}
        />
      )}

      <main>
        <Hero />
        <div className="flex flex-col">
          <Estimate />
          <Brands />
        </div>
        <TextSlider />
        <GetStarted />
        <Cta />
        <OurProcess />
        <WhoUseMiddler />
        <Cta2 />
      </main>

      <Footer />

      <OpenPopup showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
      <ToastProvider />
    </>
  );
};

export default Home;
