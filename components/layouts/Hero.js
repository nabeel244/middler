"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../ui/Button";

const Hero = () => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      setError(true);
      return;
    }

    const stored = JSON.parse(sessionStorage.getItem("paintAnswers") || "{}");
    sessionStorage.setItem(
      "paintAnswers",
      JSON.stringify({ ...stored, insidePainting: "Yes", address })
    );
    sessionStorage.setItem("paintStep", "2");
    router.push("/paint-estimator");
  };

  return (
    <section className="relative mt-20 pt-12 lg:pt-20 pb-10 px-0 lg:px-10 overflow-hidden">
      <div className="absolute -left-4 top-[126px] h-[540px] w-[250px] lg:-left-10 lg:top-1/2 lg:-translate-y-1/2 lg:size-1/2 bg-center bg-no-repeat bg-[url('/images/hero_el2.png')] lg:bg-[url('/images/hero_el.png')] bg-contain"></div>
      <div className="container xl:px-10! 2xl:w-[1300px]!">
        <div className="row gap-y-12 lg:gap-y-8 gap-x-5 justify-center xl:gap-x-20 items-center max-lg:text-center">
          <div className="lg:w-6/12 xl:w-5/12 max-lg:order-1">
            <div className="flex flex-col max-lg:px-5">
              <h1 className="font-bold text-4xl leading-[52px] lg:text-6xl lg:leading-[1.2] mb-5">
                <span className="text-primary">Calculate </span> The Price To
                Paint!
              </h1>
              <p className="text-base lg:text-2xl leading-6 lg:leading-snug">
                Get the accurate, True Price for labor, materials, and paint for
                any painting project in seconds.
              </p>
            </div>
          </div>
          <div className="lg:w-6/12 max-lg:hidden">
            <div className="relative size-full text-right">
              <img
                src="/images/hero_img.png"
                className="inline-block rounded-2xl object-contain max-h-[320px]"
                alt=""
              />
            </div>
          </div>
          <div className="mx-auto flex justify-center max-lg:order-2">
            <div className="border border-primary-300 w-full bg-white p-3 lg:p-[30px] shadow-[0_4px_40px] shadow-primary/20 rounded-[20px] flex flex-col gap-[15px] lg:gap-5">
              <div className="relative py-4 lg:px-1.5 border-b-[1.5px] border-[rgba(51,51,51,0.15)] after:h-[3px] after:w-[89px] after:absolute after:-bottom-px after:left-0 after:bg-primary">
                <p className="max-[400px]:text-[10px]! text-[3.5vw] lg:text-2xl font-semibold">
                  Enter address of the property that's being painted
                </p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="w-full flex gap-3 lg:gap-[30px] items-stretch"
              >
                <div className="p-3 rounded-xl grow bg-[#f3f3f3] flex flex-col gap-2.5 relative">
                  <div className="flex gap-2.5 items-center">
                    <span>
                      <svg
                        className="size-3.5 lg:size-6"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5 17.5L21.5 21.5"
                          stroke="#141B34"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19.5 11.5C19.5 7.08172 15.9183 3.5 11.5 3.5C7.08172 3.5 3.5 7.08172 3.5 11.5C3.5 15.9183 7.08172 19.5 11.5 19.5C15.9183 19.5 19.5 15.9183 19.5 11.5Z"
                          stroke="#141B34"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (error) setError(false);
                      }}
                      className="inline-block w-full grow outline-none! text-lg max-lg:text-[10px]"
                      placeholder="3976 First St, Glendale CA, 98765"
                    />
                  </div>
                  {error && (
                    <small className="text-red-600 text-xs lg:text-sm absolute top-full left-2 mt-1">
                      This field is required *
                    </small>
                  )}
                </div>
                <Button
                  type="submit"
                  className="rounded-xl! max-lg:py-3! max-lg:px-3! max-lg:whitespace-nowrap max-lg:text-xs cursor-pointer"
                >
                  Start Calculating
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
