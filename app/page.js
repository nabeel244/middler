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
  return (
    <>
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
