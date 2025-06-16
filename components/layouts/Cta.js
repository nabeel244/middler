"use client";

import { useEffect, useState } from "react";
import GoogleRevs from "../ui/GoogleRevs";
import Heading from "../ui/Heading";

const Cta = () => {
  const [imageSrc, setImageSrc] = useState("/images/icons/fav.png");
  const [awards, setAwards] = useState([]);

  const largeScreenAwards = ["impact award", "excellence award"];
  const smallScreenAwards = [
    `Home Owners <br/> & Diyer`,
    `Real estate & <br/> Property managers`,
    `paint <br/> contractors`,
    `interior <br/> designers`,
  ];

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 992;
      setImageSrc(isSmallScreen ? "/images/logo.png" : "/images/icons/fav.png");
      setAwards(isSmallScreen ? smallScreenAwards : largeScreenAwards);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-20 px-3 lg:px-10 bg-[#eaeff4] border-y border-white shadow-[0_3px_8px] shadow-[rgba(20,27,52,0.04)]">
      <div className="container">
        <div className="row justify-center">
          <div className="lg:w-9/12">
            <div className="flex flex-col gap-8 lg:gap-14 items-center text-center">
              <div className="max-lg:relative mb-8">
                <img
                  src={imageSrc}
                  className="w-[170px] lg:size-[148px] relative z-[1]"
                  alt=""
                />
                <div className="lg:hidden absolute top-1/2 opacity-20 z-0 left-1/2 -translate-1/2 w-[342px] h-20">
                  <img
                    src="/images/logo.png"
                    className="lg:hidden object-contain size-full"
                    alt=""
                  />
                </div>
              </div>
              <Heading
                oh
                heading="Why Middler Certifies Estimates!"
                highlight="Certifies"
                className="text-xl"
              />
              <p className="text-[11px] lg:text-[26px] lg:text-neutral-500 opacity-80 lg:mb-4">
                Because people will always think painters are making up prices
                until a trusted party like Middler starts certifying prices.
                That’s what we do.
              </p>
              <GoogleRevs />
              <p className="font-medium text-[11px] lg:text-3xl lg:leading-[53px] mt-4">
                “Middler’s prices are not for painters that are trying to rip
                people off and not for customers who want to underpay painters.
                The seal stands by that.”
              </p>
              <div className="grid grid-cols-2 lg:flex items-center justify-center gap-y-10 gap-x-5 lg:gap-[85px] mt-4">
                {awards.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center flex-col text-center"
                  >
                    <img
                      src="/images/elements/exl.png"
                      className="w-[150px] lg:w-[273px]"
                      alt={item}
                    />
                    <div
                      className="font-satoshi text-primary lg:text-black font-medium uppercase text-sm lg:text-3xl py-2.5 lg:py-1 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-[108px] lg:after:w-[48%] after:bottom-0 after:bg-gradient-to-b after:from-primary after:to-primary-950"
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
