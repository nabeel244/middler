import GoogleRevs from "../ui/GoogleRevs";
import Heading from "../ui/Heading";

const Cta = () => {
  return (
    <section className="py-20 px-10 bg-[#eaeff4] border-y border-white shadow-[0_3px_8px] shadow-[rgba(20,27,52,0.04)]">
      <div className="container">
        <div className="row justify-center">
          <div className="lg:w-9/12">
            <div className="flex flex-col gap-14 items-center text-center">
              <img
                src="/images/icons/fav.png"
                className="size-[148px]"
                alt=""
              />
              <Heading
                oh
                heading="Why Middler Certifies Estimates!"
                highlight="Certifies"
              />
              <p className="text-[26px] text-neutral-500 opacity-80 mb-4">
                Because people will always think painters are making up prices
                until a trusted party like Middler starts certifying prices.
                That’s what we do.
              </p>
              <GoogleRevs />
              <p className="font-medium text-3xl leading-[53px] mt-4">
                “Middler’s prices are not for painters that are trying to rip
                people off and not for customers who want to underpay painters.
                The seal stands by that.”
              </p>
              <div className="flex items-center justify-center gap-[85px] mt-4">
                {["impact award", "excellence award"].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center flex-col text-center"
                  >
                    <img
                      src="/images/elements/exl.png"
                      className="w-[273px]"
                      alt={item}
                    />
                    <div className="font-satoshi font-medium uppercase text-3xl py-1 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-[48%] after:bottom-0 after:bg-gradient-to-b after:from-primary after:to-primary-950">
                      {item}
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

export default Cta;
