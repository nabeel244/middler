import Button from "../ui/Button";


const Hero = () => {
  return (
    <section
      className="relative mt-20 pt-20 mb-20 bg-no-repeat"
      style={{
        backgroundImage: `url(/images/hero_bg.png)`,
        backgroundPosition: "center top",
        backgroundSize: "cover",
      }}
    >
      <div className="px-20">
        <div className="flex flex-wrap gap-y-8 justify-between items-center -mx-3 relative *:px-3 *:w-full *:relative">
          <div className="lg:w-6/12">
            <div className="flex flex-col pr-1">
              <h1 className="font-bold text-6xl leading-relaxed mb-5">
                Welcome to <span className="text-primary">Middler</span>
              </h1>
              <p className="text-2xl leading-snug">
                The only way to put a real price on a house is trhough proper
                appraisal.
              </p>
            </div>
          </div>
          <div className="lg:w-6/12">
            <div className="relative size-full">
              <img src="/images/hero_img.png" alt="" />
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
          <div className="w-full mt-16">
            <div className="grid lg:grid-cols-4 gap-10">
              {[
                {
                  title: "People using Middler",
                  count: "23,000+",
                },
                {
                  title: "In paint calculated",
                  count: "$150,000,000+",
                },
                {
                  title: "Accurate prices nationwide",
                  count: "98%",
                },
                {
                  title: "Painting estimates given out",
                  count: "$350,000,000+",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center px-5 py-10 rounded-3xl bg-gradient-to-b from-white to-[#f3f3f3] grd_shdow"
                >
                  <div className="flex gap-2 flex-col items-center">
                    <p className="text-sm">{item.title}</p>
                    <h3 className="text-2xl font-semibold">{item.count}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
