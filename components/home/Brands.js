import Image from "next/image";

const Brands = () => {
  return (
    <section className="pt-5 lg:pb-10 order-1">
      <div className="container">
        <div className="row">
          <div className="w-full">
            <div className="lg:p-2.5 max-lg:flex flex-wrap max-lg:justify-center *:max-lg:w-1/3 lg:grid lg:grid-cols-5 lg:items-center gap-y-6 lg:gap-y-2.5">
              {[
                {
                  title: "People using Middler",
                  no: "23,000+",
                  className: "max-lg:order-1",
                },
                {
                  title: "Painting estimates given out",
                  no: "$350,000,000+",
                  className: "max-lg:order-5 max-lg:w-1/2!",
                },
                {
                  img: "/images/google_reviews.webp",
                  className: "max-lg:order-2",
                },
                {
                  title: "In paint calculated",
                  no: "$150,000,000+",
                  className: "max-lg:order-3",
                },
                {
                  title: "Accurate prices nationwide",
                  no: "98%",
                  className: "max-lg:order-4 max-lg:w-1/2!",
                },
              ].map((item, idx) => {
                return item.img ? (
                  <div key={idx} className={`w-full ${item.className}`}>
                    <Image
                      src={item.img}
                      alt="Google Reviews of Middler"
                      width={180}
                      height={50}
                      className="mx-auto"
                    />
                  </div>
                ) : (
                  <div
                    key={idx}
                    className={`${item.className}  flex flex-col gap-1 items-center text-center`}
                  >
                    <span className="text-[11px] lg:text-sm leading-[25px]">
                      {item.title}
                    </span>
                    <h3 className="font-semibold text-xs lg:text-2xl">
                      {item.no}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
