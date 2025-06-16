import Button from "../ui/Button";



const Hero = () => {
  return (
    <section className="relative mt-20 pt-20 pb-10 px-10 overflow-hidden">
      <div
        className="absolute -left-10 top-1/2 -translate-y-1/2 size-1/2 bg-center bg-no-repeat bg-[url('/images/hero_el.png')]"
        style={{ backgroundSize: "contain" }}
      ></div>
      <div className="container">
        <div className="row gap-y-14 gap-x-5 justify-center items-center">
          <div className="lg:w-5/12">
            <div className="flex flex-col">
              <h1 className="font-bold text-6xl leading-snug mb-5">
                <span className="text-primary">Calculate </span> The Price To
                Paint!
              </h1>
              <p className="text-2xl leading-snug">
                Get the accurate, True Price for labor, materials, and paint for
                any painting project in seconds.
              </p>
            </div>
          </div>
          <div className="lg:w-6/12">
            <div className="relative size-full text-center">
              <img src="/images/hero_img.png" className="inline-block" alt="" />
            </div>
          </div>
          <div className="lg:w-10/12 mx-auto flex justify-center">
            <div className="w-full bg-white p-[30px] shadow-[0_4px_30px_rgba(0,0,0,0.2)] rounded-[20px] flex flex-col gap-5">
              <div className="relative py-4 px-1.5 border-b-[1.5px] border-[rgba(51,51,51,0.15)] after:h-[3px] after:w-[89px] after:absolute after:-bottom-px after:left-0 after:bg-primary">
                <p className="text-lg font-semibold">
                  Enter address of the property that's being painted
                </p>
              </div>
              <form className="w-full flex gap-[30px] items-stretch">
                <div className="p-3 rounded-xl grow bg-[#f3f3f3] flex gap-2.5 items-center">
                  <span>
                    <svg
                      width="25"
                      height="25"
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
                    className="inline-block w-full grow outline-none!"
                    placeholder="3976 First St, Glendale CA,98765Mekelle (MQX)"
                  />
                </div>
                <Button type="submit" className="rounded-xl!">
                  Search Place
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
