"use client";

import Questionnaire from "@/components/layouts/Questionnaire";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { menuItems } from "../constants";

const page = () => {
  const [mobileImgs, setMobileImgs] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 992;
      setMobileImgs(isSmallScreen ? true : false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-dvh h-full overflow-hidden w-full p-6 lg:p-3 lg:pt-5 bg-cover bg-no-repeat bg-center bg-[url('/images/modals/bg_1.png')]">
      <div className="grid size-full lg:grid-rows-1 xl:grid-cols-[auto_1fr_auto] gap-5">
        <div className="max-lg:hidden pt-10 max-w-[288px]">
          <img src="/images/modals/1.png" className="h-full w-full" alt="" />
        </div>
        <div className="w-full flex items-center flex-col justify-between gap-6 lg:gap-7">
          <div
            ref={dropdownRef}
            className="max-lg:flex justify-between items-center max-lg:w-full relative"
          >
            <img
              src={mobileImgs ? "/images/logo_bold.png" : "/images/logo.png"}
              className="max-w-[230px] lg:max-w-[280px] lg:mt-3"
              alt=""
            />
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="flex lg:hidden"
            >
              <span className="w-[26px] h-4 block relative">
                <span
                  className={`h-0.5 bg-black block left-0 rounded-xl w-full transition-all duration-300 absolute ${
                    isMobileMenuOpen
                      ? "rotate-45 top-1/2 -translate-y-1/2"
                      : "top-0"
                  }`}
                />
                <span
                  className={`h-0.5 bg-black block left-0 rounded-xl w-4/5 transition-all duration-300 absolute ${
                    isMobileMenuOpen ? "opacity-0" : "top-1/2 -translate-y-1/2"
                  }`}
                />
                <span
                  className={`h-0.5 bg-black block left-0 rounded-xl w-full transition-all duration-300 absolute ${
                    isMobileMenuOpen
                      ? "-rotate-45 top-1/2 -translate-y-1/2"
                      : "bottom-0"
                  }`}
                />
              </span>
            </button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="lg:hidden bg-white border-t border-t-primary shadow-[0_10px_10px_rgba(0,0,0,0.2)] rounded-b-2xl px-5 py-4 absolute top-full left-0 w-full z-[1001]"
                >
                  <ul className="flex flex-col gap-4">
                    {menuItems.slice(0, 3).map((item, index) => (
                      <li key={index} className="pl-1">
                        <Link
                          href={item.url}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block ${
                            pathname === item.url
                              ? "text-primary font-semibold"
                              : "text-black hover:text-primary"
                          } transition-all duration-200 ease-in-out`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:px-[35px] pt-6 lg:py-6 mt-3 max-lg:self-end lg:mt-6 flex items-center justify-center gap-x-[118px] lg:gap-x-[150px]">
            <div className="size-7 lg:size-10 rounded-full bg-primary text-white relative flex items-center justify-center before:absolute before:top-1/2 before:-translate-y-1/2 before:left-full before:h-0.5 lg:before:h-[3px] before:w-[118px] lg:before:w-[150px] before:bg-[#6F6F6F] before:z-0 after:absolute after:top-1/2 after:-translate-y-1/2 after:left-full after:h-0.5 lg:after:h-[3px] after:w-[118px] lg:after:w-[150px] after:bg-primary">
              <FaCheck />
              <span className="max-lg:text-[10px] lg:font-bold text-primary absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap">
                Project Details
              </span>
            </div>

            <div className="size-7 lg:size-10 rounded-full border-2 border-primary relative flex items-center justify-center before:absolute before:top-1/2 before:-translate-y-1/2 before:left-full before:ml-0.5 before:h-0.5 lg:before:h-[3px] before:w-[118px] lg:before:w-[150px] before:bg-[#6F6F6F]">
              <span className="inline-block size-2 lg:size-3.5 rounded-full bg-primary" />
              <span className="max-lg:text-[10px] font-normal text-primary absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap">
                See Prices
              </span>
            </div>

            <div className="size-7 lg:size-10 rounded-full border-2 border-[#6F6F6F] flex items-center justify-center relative">
              <span className="max-lg:text-[10px] font-normal text-[#6F6F6F] absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap">
                Use it
              </span>
              <img src="/images/icons/paint.png" className="w-6" alt="" />
            </div>
          </div>

          <div className="lg:hidden">
            <img src="/images/modals/team.png" alt="" />
          </div>

          <div className="lg:px-20 w-full">
            <div className="px-4 lg:px-11 py-[30px] lg:py-8 flex flex-col items-center justify-center gap-[30px] bg-white shadow-[0_6px_46px] shadow-black/20 rounded-3xl lg:rounded-[31px]">
              <Questionnaire />
            </div>
          </div>

          <div className="max-lg:hidden mt-5 w-full">
            <img
              src="/images/modals/3.png"
              className="w-full object-cover max-h-[280px] rounded-2xl"
              alt=""
            />
          </div>

          <div className="lg:hidden grid w-full grid-cols-2 gap-3">
            <div className="col-span-2">
              <img src="/images/modals/wmn_laugh.png" alt="" />
            </div>
            <div>
              <img src="/images/modals/car.png" alt="" />
            </div>
            <div>
              <img src="/images/modals/five_star.png" alt="" />
            </div>
          </div>
        </div>
        <div div className="max-lg:hidden pt-10 max-w-[288px]">
          <img src="/images/modals/2.png" className="h-full w-full" alt="" />
        </div>
      </div>
    </div>
  );
};

export default page;
