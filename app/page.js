import Brands from "@/components/home/Brands";
import Estimate from "@/components/home/Estimate";
import Cta from "@/components/layouts/Cta";
import GetStarted from "@/components/layouts/GetStarted";
import Hero from "@/components/layouts/Hero";
import TextSlider from "@/components/layouts/TextSlider";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="flex flex-col">
        <Estimate />
        <Brands />
      </div>
      <TextSlider />
      <GetStarted />
      <Cta />
    </>
  );
};

export default Home;
