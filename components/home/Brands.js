const Brands = () => {
  return (
    <section className="py-10">
      <div className="px-10">
        <div className="row">
          <div className="w-full">
            <div className="p-2.5 grid lg:grid-cols-5 items-center">
              {[
                {
                  title: "People using Middler",
                  no: "23,000+",
                },
                {
                  title: "Painting estimates given out",
                  no: "$350,000,000+",
                },
                {
                  img: "/images/google_reviews.png",
                },
                {
                  title: "In paint calculated",
                  no: "$150,000,000+",
                },
                {
                  title: "Accurate prices nationwide",
                  no: "98%",
                },
              ].map((item, idx) => {
                return item.img ? (
                  <div key={idx} className="w-full">
                    <img src={item.img} alt="" />
                  </div>
                ) : (
                  <div key={idx} className="flex flex-col gap-1 items-center text-center">
                    <span className="text-sm leading-[25px]">{item.title}</span>
                    <h3 className="font-semibold text-2xl">{item.no}</h3>
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
