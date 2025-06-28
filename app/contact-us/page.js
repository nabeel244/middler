import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";

const page = () => {
  return (
    <>
      <Header />

      <section className="relative mt-14 lg:mt-20 pt-12 lg:pt-20 pb-10 px-0 lg:px-10 overflow-hidden">
        <div className="absolute -left-4 top-[126px] h-[540px] w-[250px] lg:-left-10 lg:top-1/2 lg:-translate-y-1/2 lg:size-1/2 bg-center bg-no-repeat bg-[url('/images/hero_el2.png')] lg:bg-[url('/images/hero_el.png')] bg-contain"></div>
        <div className="container">
          <div className="row gap-y-14 lg:gap-y-8 gap-x-5 justify-center xl:gap-x-20 items-center max-lg:text-center">
            <div className="lg:w-6/12 xl:w-5/12 max-lg:order-1">
              <div className="flex flex-col max-lg:px-5">
                <h1 className="font-bold text-[40px] leading-14 lg:text-6xl lg:leading-[1.2] mb-5">
                  <span className="text-primary">Contact Us</span>
                </h1>
                <p className="text-base lg:text-2xl leading-6 lg:leading-snug">
                  Need Support? Get in touch!
                </p>
              </div>
            </div>
            <div className="lg:w-6/12 max-lg:hidden">
              <div className="relative size-full text-right">
                <img
                  src="/images/contact_hero.jpg"
                  className="inline-block rounded-2xl object-contain max-h-[320px]"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="row">
            <div className="w-full">
              <div className="bg-[#0b0b0b]/10 rounded-3xl lg:rounded-[40px] p-10">
                <div className="flex flex-wrap items-center justify-between">
                  <div className="lg:w-2/5">
                    <h2 className="text-black font-bold text-[22px] lg:text-5xl mb-5">
                      Email
                    </h2>
                    <a
                      href="mailto:support@middler.com"
                      className="text-neutral-600 font-medium text-2xl mb-2 block hover:text-primary transition-all duration-300 ease-in-out"
                    >
                      support@middler.com
                    </a>
                    <p className="text-neutral-400 text-xs">
                      One of our expert Middler representatives will reach out
                      to you within 1 business day *
                    </p>
                  </div>
                  <div className="lg:w-1/2">
                    <Heading
                      heading="Let us lend a hand"
                      highlight="let us"
                      oh
                      className="text-left w-full"
                    />
                    <form className="mt-5">
                      <div className="flex flex-col gap-4 *:w-full *:relative">
                        <div>
                          <input
                            type="text"
                            name="email"
                            placeholder="Your Email *"
                            className="w-full bg-white rounded-xl px-3 py-5 outline-none border border-white focus:border-primary focus:shadow-[0_0_10px] shadow-primary/20 shadow-none transition-all duration-300 ease-in-out"
                          />
                        </div>
                        <div>
                          <textarea
                            name="message"
                            rows={5}
                            placeholder="Start typing here..."
                            className="w-full bg-white resize-none rounded-xl px-3 py-5 outline-none border border-white focus:border-primary focus:shadow-[0_0_10px] shadow-primary/20 shadow-none transition-all duration-300 ease-in-out"
                          />
                        </div>
                        <div>
                          <Button className="rounded-xl!">Send Message</Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default page;
