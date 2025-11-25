'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

const CalculateRoomCost = ({ content }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };

    handleResize();
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  if (!content) return null;

  return (
    <section className="px-5 lg:px-10 pb-20 lg:pt-20">
      <div className="container">
        <div className="row">
          <div className="w-full">
            <div className="flex flex-col-reverse max-lg:gap-y-10 lg:gap-x-20 lg:flex-row text-center lg:text-left items-center justify-between">
              <Image
                src={content.image || "/images/mobile.webp"}
                alt="Mobile illustration"
                width={340}
                height={340}
                className="lg:w-[340px]"
              />
              <div className="w-full max-w-[800px] flex-col flex gap-10">
                <h2 className="font-bold text-2xl lg:text-[50px]">
                  <span className="text-primary">{content.headingHighlight} </span> {content.heading.replace(content.headingHighlight, '').trim()}
                </h2>
                <p className="text-sm lg:text-2xl text-left">
                  {content.description}
                </p>
                <p className="text-sm lg:text-2xl text-left">
                  {content.description2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculateRoomCost;

