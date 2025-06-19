"use client";
import { useEffect, useState } from "react";
import GoogleRevs from "../ui/GoogleRevs";
import Heading from "../ui/Heading";

const Cta = () => {
  const [imageSrc, setImageSrc] = useState("/images/icons/fav.png");
  const [awardsImg, setAwardsImg] = useState("/images/elements/exl.png");
  const [awards, setAwards] = useState([]);

  const smallScreenAwards = ["impact award", "excellence award"];
  const largeScreenAwards = [
    `Home Owners <br/> & Diyer`,
    `Real estate & <br/> Property managers`,
    `paint <br/> contractors`,
    `interior <br/> designers`,
  ];

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 992;
      setImageSrc(isSmallScreen ? "/images/icons/fav.png" : "/images/logo.png");
      setAwardsImg(
        isSmallScreen ? "/images/elements/exl2.png" : "/images/elements/exl.png"
      );
      setAwards(isSmallScreen ? smallScreenAwards : largeScreenAwards);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className=" lg:py-20">
      <div className="container">
        <div className="row justify-center">
          <div className="w-full max-lg:px-0">
            <div className="flex flex-col lg:gap-[30px] max-lg:px-6 py-10 lg:py-20 items-center text-center bg-[#eaeff4] lg:bg-[#0b0b0b]/10 lg:rounded-[40px] lg:*:px-[130px] lg:*:py-8 *:w-full">
              <div className="relative w-full flex items-center justify-center">
                <img
                  src={imageSrc}
                  className="w-[75px] lg:w-[350px] relative z-[1] inline-block max-lg:mb-[30px]"
                  alt=""
                />
                <img
                  src="/images/logo.png"
                  className="max-lg:hidden absolute inset-0 m-auto w-full lg:max-w-[743px] lg:h-[170px] object-contain opacity-15"
                  alt=""
                />
              </div>
              <div className="pb-0!">
                <Heading
                  oh
                  heading="Why Middler Certifies Estimates!"
                  highlight="Certifies"
                  className="text-xl"
                />
                <p className="text-[11px] lg:text-2xl mt-3 max-lg:mb-[35px] lg:mt-5">
                  Because people will always doubt contractor pricing until a trusted platform like Middler starts certifying estimates. That’s what we do — for painters, plumbers, and everyone else.
                </p>
              </div>
              <div>
                <p className="font-medium text-[11px] lg:text-2xl">
                  “Middler’s prices are not for painters that are trying to rip
                  people off and not for customers who want to underpay
                  painters. The seal stands by that.”
                </p>
              </div>
              <div className="lg:hidden max-lg:mt-10 w-auto!">
                <GoogleRevs />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-5 lg:gap-x-[25px] mt-10 lg:mt-4 px-3! py-0!">
                {awards.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center flex-col text-center"
                  >
                    <img
                      src={awardsImg}
                      className="w-[150px] lg:w-[231px]"
                      alt={item}
                    />
                    <div
                      className="font-satoshi text-black lg:text-primary font-medium uppercase text-sm lg:text-xl py-[5px] lg:py-[7px] relative after:absolute after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-[108px] lg:after:w-[48%] after:bottom-0 after:bg-gradient-to-b after:from-primary after:to-primary-900"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
