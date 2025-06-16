const Brands = () => {
  return (
    <section className="pt-5 lg:py-10 max-lg:order-1">
      <div className="px-3 lg:px-10">
        <div className="row">
          <div className="w-full">
            <div className="p-2.5 max-lg:flex flex-wrap *:max-lg:w-1/3 lg:grid lg:grid-cols-5 gap-y-2.5">
              {[
                {
                  title: "People using Middler",
                  no: "23,000+",
                  className: "max-lg:order-1"
                },
                {
                  title: "Painting estimates given out",
                  no: "$350,000,000+",
                  className: "max-lg:order-5"
                },
                {
                  img: "/images/google_reviews.png",
                  className: "max-lg:order-2"
                },
                {
                  title: "In paint calculated",
                  no: "$150,000,000+",
                  className: "max-lg:order-3"
                },
                {
                  title: "Accurate prices nationwide",
                  no: "98%",
                  className: "max-lg:order-4"
                },
              ].map((item, idx) => {
                return item.img ? (
                  <div key={idx} className={`w-full ${item.className}`}>
                    <img src={item.img} alt="" />
                  </div>
                ) : (
                  <div key={idx} className={`${item.className} flex flex-col gap-1 items-center text-center`}>
                    <span className="text-[8px] lg:text-sm leading-[25px]">{item.title}</span>
                    <h3 className="font-semibold text-[8px] lg:text-2xl">{item.no}</h3>
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
