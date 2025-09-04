'use client';

import { estimateCards } from "@/app/constants";
import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Image from "next/image";

const Estimate = () => {
  const [smallSize, setSmallSize] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 992;
      setSmallSize(
        isSmallScreen ? true : false
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Alt tags for the background images
  const backgroundImageAlts = [
    "Interior house paint cost Estimate",
    "Cabinet paint cost estimate", 
    "Exterior house paint cost Estimate",
    "House paint estimate cost"
  ];

  return (
    <section className="relative pt-16 lg:py-10 order-2">
      <div className="container">
        <div className="row">
          <div className="w-full">
            <div className="px-3 lg:px-5 py-10 flex flex-col items-center justify-center gap-[50px]">
              <Heading
                heading={smallSize ? "Answer a few question and in 30 seconds, You Will Get To See What It Costs To Paint." : "Answer a few question and in 30 seconds, this is exactly what you'll see."}
                highlight="Answer"
                preheading="estimate"
              />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 w-full">
                {estimateCards.map((card, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl px-3 py-6 lg:py-2.5 min-h-[150px] lg:min-h-[145px] h-full ${card.active
                      ? "bg-primary text-white grd_shdow border border-white"
                      : "bg-primary/10 border-[.5px] border-primary/50"
                      } relative flex flex-col justify-between items-center max-lg:text-center lg:items-start overflow-hidden`}
                  >
                    {/* Background Image using Next.js Image component */}
                    <Image
                      src={`/images/elements/${smallSize ? `1_${idx + 1}` : idx + 1}.webp`}
                      alt={backgroundImageAlts[idx]}
                      fill
                      className="object-cover object-center z-0"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    />
                    
                    {/* Icon Image */}
                    <span className="relative z-10">
                      <Image
                        src={`/images/icons/${idx + 1}.webp`}
                        alt={backgroundImageAlts[idx]}
                        width={40}
                        height={40}
                        className="size-10"
                      />
                    </span>
                    
                    <div className="pb-2 relative z-10">
                      <span className="capitalize text-[11px] tracking-[1px] block mb-1.5">
                        {card.title}
                      </span>
                      <h3 className="font-semibold text-[26px] lg:text-[40px] leading-none">
                        {card.desc}
                      </h3>
                    </div>
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

export default Estimate;
