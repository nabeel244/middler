import { FaCheck } from "react-icons/fa";
import Heading from "../ui/Heading";
import Image from "next/image";

const OurProcess = () => {
  const process = [
    {
      title: "Create a professional estimate in 4 simple steps",
      text: "Enter your property address or basic job details. No measuring, guessing, or complicated forms just simple input ot get started fast",
    },
    {
      title: "Get Instant Estimate",
      text: "Our AI-powered engine analyzes your input and instantly calculates a detailed, itemized paint estimate interior, exterior, or both.",
    },
    {
      title: "Trust the Accuracy",
      text: "We factor in local labor rates, paint coverage, and material costs to show the true cost to paint a house.",
    },
    {
      title: "Download & Share",
      text: "Get your estimate for free and share it with your partner, homeowner, landlord, or anyone helping with the job.",
    },
  ];

  return (
    <section className="px-5 lg:px-10 py-20">
      <div className="container">
        <div className="row">
          <div className="w-full">
            <div className="flex flex-col w-full items-center text-center gap-y-20 lg:gap-y-32">
              <div className="lg:w-[68%]">
                <Heading
                  heading="How it works!"
                  highlight="works!"
                  preheading="our process"
                  phClassname="mb-[30px]"
                  className="text-[26px]"
                />
                <p className="text-center text-sm lg:text-2xl mt-2">
                  Whether you’re on-site or at the office, Middler makes it fast
                  and easy to generate polished, data-backed painting estimates.
                  Here’s how:
                </p>
              </div>
              <div className="lg:px-10">
                <div className="flex flex-col gap-y-14 lg:gap-y-[180px]">
                  {process.map((item, idx) => (
                    <div
                      key={idx}
                      className={`grid lg:grid-cols-[154px_auto] w-full gap-12`}
                    >
                      <div
                        className={`max-lg:hidden size-[154px] relative  ${idx !== 3
                          ? "after:absolute after:h-[179px] after:w-1 after:bg-gradient-to-b after:from-primary after:to-primary/40 after:top-[168px] after:left-[75px]"
                          : ""
                          }`}
                      >
                        <Image
                          src={`/images/process/${idx + 1}.webp`}
                          alt={item.title}
                          width={154}
                          height={154}
                          className="w-[154px]"
                        />
                      </div>
                      <div className="flex flex-col items-start text-left max-lg:pl-10">
                        <span className="block mb-8 p-[3px] bg-gradient-to-br from-primary to-[#8dacff] rounded-2xl grd_shdow-3">
                          <span className="inline-block py-2 text-sm px-[22px] rounded-[13px] bg-[#dfe8ff] ">
                            Step {idx + 1}
                          </span>
                        </span>
                        <div className="relative">
                          <div className="lg:hidden absolute -left-10 top-0 grid grid-rows-[18px_1fr] justify-items-center gap-2 h-full">
                            <span className="size-[18px] flex items-center justify-center text-[8px] text-white bg-primary rounded-full">
                              <FaCheck />
                            </span>
                            <div className="h-full w-0 border-2 border-dashed border-primary" />
                          </div>
                          <h3 className=" mb-2 lg:mb-5 text-[13px] lg:text-2xl font-bold">
                            {item.title}
                          </h3>
                          <p className="font-normal text-xs lg:text-2xl">
                            {item.text}
                          </p>
                        </div>
                      </div>
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

export default OurProcess;
