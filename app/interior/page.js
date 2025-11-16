"use client";
import dynamic from "next/dynamic";
import { useEffect, useState, Suspense } from "react";

// Critical above-the-fold components (load immediately)
import Header from "@/components/layouts/Header";
import Hero from "@/components/layouts/Hero";

// Non-critical components (lazy loaded)
const Brands = dynamic(() => import("@/components/home/Brands"), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse" />,
});

const Estimate = dynamic(() => import("@/components/home/Estimate"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

const TextSlider = dynamic(() => import("@/components/layouts/TextSlider"), {
  loading: () => <div className="h-20 bg-gradient-to-br from-primary-800 to-primary animate-pulse" />,
});

const GetStarted = dynamic(() => import("@/components/layouts/GetStarted"), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse" />,
});

const Cta = dynamic(() => import("@/components/layouts/Cta"), {
  loading: () => <div className="h-40 bg-gray-100 animate-pulse" />,
});

const OurProcess = dynamic(() => import("@/components/home/OurProcess"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

const WhoUseMiddler = dynamic(() => import("@/components/home/WhoUseMiddler"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

const Cta2 = dynamic(() => import("@/components/layouts/Cta2"), {
  loading: () => <div className="h-40 bg-gray-100 animate-pulse" />,
});

const Footer = dynamic(() => import("@/components/layouts/Footer"), {
  loading: () => <div className="h-64 bg-gray-900 animate-pulse" />,
});

const Faq = dynamic(() => import("@/components/layouts/Faq"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

// Heavy modal components (only load when needed)
const GiftPopup = dynamic(() => import("@/components/modals/GiftPopup"));
const OpenPopup = dynamic(() => import("@/components/ui/OpenPopup"));
const ToastProvider = dynamic(() => import("@/components/ToastProvider"));

const Interior = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Optimized useEffect - defer sessionStorage access
  useEffect(() => {
    // Use setTimeout to defer non-critical operations
    const timer = setTimeout(() => {
      setIsClient(true);
      try {
        const saved = sessionStorage.getItem("noEmailEntered");
        if (saved) {
          setShowPopUp(saved);
          sessionStorage.removeItem("noEmailEntered");
        }
      } catch (error) {
        console.warn("SessionStorage access failed:", error);
      }
    }, 100); // Small delay to prevent blocking

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Critical above-the-fold content */}
      <Header />

      {/* Conditional popup - only render when needed */}
      {isClient && showPopUp && (
        <Suspense fallback={null}>
          <GiftPopup
            showPopUp={showPopUp}
            setShowPopUp={setShowPopUp}
            isMainPage={true}
          />
        </Suspense>
      )}

      <main>
        {/* Critical content first */}
        <Hero />
        
        {/* Below-the-fold content with lazy loading */}
        <div className="flex flex-col">
          <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
            <Estimate />
          </Suspense>
          <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse" />}>
            <Brands />
          </Suspense>
        </div>
        
        <Suspense fallback={<div className="h-20 bg-gradient-to-br from-primary-800 to-primary animate-pulse" />}>
          <TextSlider />
        </Suspense>
        
        <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse" />}>
          <GetStarted />
        </Suspense>
        
        <Suspense fallback={<div className="h-40 bg-gray-100 animate-pulse" />}>
          <Cta />
        </Suspense>
        
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
          <OurProcess />
        </Suspense>
        
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
          <WhoUseMiddler />
        </Suspense>
        
        <Suspense fallback={<div className="h-40 bg-gray-100 animate-pulse" />}>
          <Cta2 />
        </Suspense>
        
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
          <Faq type="interior" />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-64 bg-gray-900 animate-pulse" />}>
        <Footer />
      </Suspense>

      {/* Non-critical components */}
      {isClient && (
        <Suspense fallback={null}>
          <OpenPopup showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
        </Suspense>
      )}
      
      <Suspense fallback={null}>
        <ToastProvider />
      </Suspense>
    </>
  );
};

export default Interior;