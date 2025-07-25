"use client";
import { FaCheck } from "react-icons/fa";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
const GetStarted = () => {
  return (
    <section className="mb-20 overflow-hidden">
      <div className="container">
        <div className="row justify-center gap-y-[50px]">
          <div className="lg:w-7/12 max-lg:px-8">
            <Heading
              heading="Ready to Get The Price To Paint —Faster?"
              highlight="Ready"
              preheading="get started"
              className="text-[26px]"
            />
          </div>
          <div className="w-full">
            <div className="grid w-full max-lg:grid-cols-1 max-lg:gap-y-6">
              <div className="lg:col-start-1 lg:-col-end-1 lg:row-start-1 lg:-row-end-1 col-span-1">
                <div className="flex justify-center max-lg:w-full">
                  <div className="relative max-lg:min-h-[392px] max-lg:w-full">
                    <img
                      src="/images/mobile_mockup2.png"
                      className="max-w-[342px] md:max-w-[600px] max-lg:absolute left-1/2 max-lg:-translate-x-1/2"
                      alt=""
                    />
                    {[
                      "Built for any project",
                      "get the true cost to paint price",
                      "data-Driven accuracy",
                      "Lightning-Fast estimates",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`absolute z-[2] flex items-center justify-center px-2 lg:px-7 py-2 lg:py-3.5 gap-[7] bg-[rgba(255,255,255,0.32)] lg:bg-[rgba(0,0,0,0.095)] backdrop-blur-[36px] shadow-[0_3.75px_5.95px_rgba(0,0,0,0.12)] rounded-lg ${
                          idx === 0
                            ? "lg:-left-5 left-4 top-[21%]"
                            : idx === 1
                            ? "lg:-left-24 left-1 top-[58%] lg:top-2/4"
                            : idx === 2
                            ? "lg:-right-5 right-3 top-[13%]"
                            : idx === 3
                            ? "lg:-right-14 right-2 top-[47%] lg:top-3/8"
                            : ""
                        }`}
                      >
                        <span className="inline-flex items-center justify-center rounded-full size-4 lg:size-5 border border-primary bg-primary text-white text-[8px] lg:text-[10px]">
                          <FaCheck />
                        </span>
                        <span className="text-[8px] whitespace-nowrap lg:text-[15.8px]">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="max-lg:px-5 lg:col-start-1 lg:-col-end-1 lg:row-start-1 lg:-row-end-1 flex max-lg:flex-wrap justify-between items-end relative z-[1]">
                <div className="lg:w-[30%] flex flex-col gap-5 max-lg:order-2 w-full max-lg:mt-8">
                  <p className="text-2xl max-lg:hidden">
                    Know the true cost before the first brushstroke begins.
                    Middler gives you precise estimates with total clarity
                  </p>
                  <div className="max-lg:flex justify-center max-lg:w-full">
                    <Button small>Try now</Button>
                  </div>
                </div>
                <div className="lg:w-[25%] flex flex-col gap-10 max-lg:order-1">
                  {[
                    {
                      icon: "rating.png",
                      text: `<b>No more vague estimates</b><br/> Middler gives you the real deal, instantly.`,
                    },
                    {
                      icon: "usd.png",
                      text: `<b>Get a Real Price for your house painting</b><br/> Fast, Clear, and Accurate.`,
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col max-lg: items-center max-lg:text-center lg:flex-row gap-5 lg:gap-x-3.5 max-lg:border-b border-b-primary-400 max-lg:pb-2"
                    >
                      <img
                        className="w-[38px] h-[51px] lg:w-[30px] object-contain lg:h-10"
                        src={`/images/icons/${item.icon}`}
                        alt=""
                      />
                      <p
                        className="text-base lg:text-lg p_w_b"
                        dangerouslySetInnerHTML={{ __html: item.text }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
