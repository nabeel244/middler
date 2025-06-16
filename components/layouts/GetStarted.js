import { FaCheck } from "react-icons/fa";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
const GetStarted = () => {
  return (
    <section className="mb-20">
      <div className="container">
        <div className="row justify-center gap-y-[50px]">
          <div className="lg:w-7/12">
            <Heading
              heading="Ready to Get The Price To Paint —Faster?"
              highlight="Ready"
              preheading="get started"
            />
          </div>
          <div className="w-full">
            <div className="grid w-full">
              <div className="col-start-1 -col-end-1 row-start-1 -row-end-1">
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src="/images/mobile_mockup.png"
                      className="max-w-[600px]"
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
                        className={`absolute z-[2] flex items-center justify-center px-7 py-3.5 gap-[7] bg-[rgba(0,0,0,0.095)] backdrop-blur-[36px] shadow-[0_3.75px_5.95px_rgba(0,0,0,0.12)] rounded-lg ${idx === 0
                            ? "-left-5 top-[22%]"
                            : idx === 1
                              ? "-left-24 top-2/4"
                              : idx === 2
                                ? "-right-5 top-1/8"
                                : idx === 3
                                  ? "-right-14 top-3/8"
                                  : ""
                          }`}
                      >
                        <span className="inline-flex items-center justify-center rounded-full size-5 border border-primary bg-primary text-white text-[10px]">
                          <FaCheck />
                        </span>
                        <span className="text-[15.8px]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-start-1 -col-end-1 row-start-1 -row-end-1 flex justify-between items-end relative z-[1]">
                <div className="lg:w-[316px] flex flex-col gap-4">
                  <p className="text-xl">
                    Know the true cost before the first brushstroke begins.
                    Middler gives you precise estimates with total clarity
                  </p>
                  <div>
                    <Button small>try now</Button>
                  </div>
                </div>
                <div className="lg:w-[28%] flex flex-col gap-10">
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
                    <div key={idx} className="flex gap-x-3.5">
                      <img
                        className="w-[30px] object-contain h-10"
                        src={`/images/icons/${item.icon}`}
                        alt=""
                      />
                      <p
                        className="text-lg"
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
