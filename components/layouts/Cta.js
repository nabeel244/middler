"use client";
import { useEffect, useState } from "react";
import GoogleRevs from "../ui/GoogleRevs";
import Heading from "../ui/Heading";

const Cta = () => {
  const [imageSrc, setImageSrc] = useState("/images/icons/fav.png");
  const [awardsImg, setAwardsImg] = useState("/images/elements/exl.png");

  const awards = [
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
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className=" lg:py-20">
      <div className="container">
        <div className="row justify-center">
          <div className="w-full">
            <div className="flex flex-col lg:gap-[30px] max-lg:*:px-5 py-10 lg:py-[70px] items-center text-center bg-[#0b0b0b]/10 rounded-3xl lg:rounded-[40px] lg:*:px-[130px] lg:*:py-6 *:w-full">
              <div className="relative w-full flex items-center justify-center lg:py-3! max-lg:mb-10">
                <img
                  src="/images/logo.png"
                  className="w-[160px] lg:w-[320px] relative z-[1] inline-block"
                  alt=""
                />
                <img
                  src="/images/logo.png"
                  className="absolute inset-0 m-auto w-full max-w-[300px] lg:max-w-[700px] lg:h-[150px] object-contain opacity-15"
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
              <div className="grid grid-cols-2 max-lg:px-0! lg:grid-cols-4 gap-y-10 gap-x-0 lg:gap-x-[25px] mt-10 lg:mt-4 lg:px-3! py-0!">
                {awards.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center flex-col text-center"
                  >
                    <img
                      src={awardsImg}
                      className="w-[150px] lg:w-[200px]"
                      alt={item}
                    />
                    <div
                      className="text-primary font-medium uppercase text-sm lg:text-xl py-[5px] lg:py-[7px] relative after:absolute after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-[108px] lg:after:w-[48%] after:bottom-0 after:bg-gradient-to-b after:from-primary after:to-primary-900"
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
