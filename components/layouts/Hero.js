import Button from "../ui/Button";



const Hero = () => {
  return (
    <section className="relative mt-16 lg:mt-20 pt-12 lg:pt-20 pb-10 px-5 lg:px-10 overflow-hidden">
      <div
        className="absolute -left-4 top-[126px] h-[540px] w-[250px] lg:-left-10 lg:top-1/2 lg:-translate-y-1/2 lg:size-1/2 bg-center bg-no-repeat bg-[url('/images/hero_el2.png')] lg:bg-[url('/images/hero_el.png')] bg-contain"
      ></div>
      <div className="container xl:px-10! 2xl:w-[1300px]!">
        <div className="row gap-y-12 gap-x-5 justify-center xl:gap-x-20 items-center max-lg:text-center">
          <div className="lg:w-6/12 xl:w-5/12 max-lg:order-1">
            <div className="flex flex-col">
              <h1 className="font-bold text-[34px] lg:text-6xl leading-[1.2] mb-5">
                <span className="text-primary">Calculate </span> The Price To
                Paint!
              </h1>
              <p className="text-base lg:text-2xl leading-snug">
                Get the accurate, True Price for labor, materials, and paint for
                any painting project in seconds.
              </p>
            </div>
          </div>
          <div className="lg:w-6/12 max-lg:hidden">
            <div className="relative size-full text-center">
              <img src="/images/hero_img.png" className="inline-block max-h-[285px] object-cover rounded-2xl w-full" alt="" />
            </div>
          </div>
          <div className="mx-auto flex justify-center max-lg:order-2">
            <div className="w-full bg-white p-6 lg:p-[30px] shadow-[0_4px_30px_rgba(0,0,0,0.2)] rounded-[20px] flex flex-col gap-6 lg:gap-5">
              <div className="relative py-4 lg:px-1.5 border-b-[1.5px] border-[rgba(51,51,51,0.15)] after:h-[3px] after:w-[89px] after:absolute after:-bottom-px after:left-0 after:bg-primary">
                <p className="text-[11px] lg:text-2xl font-semibold">
                  Enter address of the property that's being painted
                </p>
              </div>
              <form className="w-full flex gap-3 lg:gap-[30px] items-stretch">
                <div className="p-3 rounded-xl grow bg-[#f3f3f3] flex gap-2.5 items-center">
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
                    className="inline-block w-full grow outline-none! text-lg max-lg:text-[8px]"
                    placeholder="3976 First St, Glendale CA,98765Mekelle (MQX)"
                  />
                </div>
                <Button type="submit" className="rounded-xl! max-lg:py-4! max-lg:px-2! max-lg:whitespace-nowrap max-lg:text-[8px]">
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
