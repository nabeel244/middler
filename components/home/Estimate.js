import { estimateCards } from "@/app/constants";
import Heading from "../ui/Heading";

const Estimate = () => {
  return (
    <section className="relative pt-10 lg:py-10 max-lg:order-2">
      <div className="container">
        <div className="row">
          <div className="w-full">
            <div className="px-5 py-10 flex flex-col items-center justify-center gap-[50px]">
              <Heading
                heading="Answer a few question and in 30 seconds, this is exactly what you’ll see."
                highlight="Answer"
                preheading="estimate"
              />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10 w-full">
                {estimateCards.map((card, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl px-3 py-4 lg:py-2.5 min-h-[150px] lg:min-h-[145px] h-full ${card.active
                      ? "bg-primary text-white grd_shdow border border-white"
                      : "bg-primary/10 border-[.5px] border-primary/50"
                      } relative flex flex-col justify-between items-center max-lg:text-center lg:items-start`}
                  >
                    <div
                      className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(/images/elements/${idx + 1}.png)`,
                      }}
                    />
                    <span>
                      <img
                        src={`/images/icons/${idx + 1}.png`}
                        className="size-10"
                        alt=""
                      />
                    </span>
                    <div className="pb-2">
                      <span className="font-rubik capitalize text-[11px] tracking-[1px] block mb-1.5">
                        {card.title}
                      </span>
                      <h3 className="font-rubik font-semibold text-[26px] lg:text-[40px] leading-none">
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
