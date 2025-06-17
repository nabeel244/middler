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

const Home = () => {
  return (
    <>
      <Header />

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
    </>
  );
};

export default Home;
