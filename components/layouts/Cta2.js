'use client';
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

const ctaPoints = [
  "Lightning-Fast Estimates",
  "Data-Driven Accuracy",
  "Branded, Professional Reports",
  "Built for Painting Pros",
];

const Cta2 = () => {
  const [smallSize, setSmallSize] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 992;
      setSmallSize(
        isSmallScreen ? true : false
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="px-5 lg:px-10 pb-20 lg:pt-20">
      <div className="container">
        <div className="row">
          <div className="w-full">
            <div className="flex flex-col-reverse  max-lg:gap-y-10 lg:flex-row text-center lg:text-left items-center justify-between">
              <img
                src="/images/mobile.png"
                className="lg:w-[300px] drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                alt=""
              />
              <div className="w-full max-w-[800px] flex-col flex gap-10">
                <h2 className="font-bold text-2xl lg:text-[50px]">
                  <span className="text-primary">Ready</span> {smallSize ? "Ready to Win More Jobs—Faster?" : "to Make Smarter Project Decisions—Faster?"}
                </h2>
                <p className="text-sm lg:text-2xl text-left">
                  {smallSize ? "Level up with Middler, the smart estimating tool! Whether you're planning a renovation, budgeting for a trip, or tracking expenses, Middler helps you get accurate estimates and stay on track. No spreadsheets. No guesswork. Just better results." : "Level up your next home project with Middler, the smart estimating tool built for everyone. Whether you're planning interiors, exteriors, or full renovations, Middler helps you create fast, accurate, and professional estimates—every single time."}
                </p>
                {!smallSize && <p className="text-[11px] lg:text-2xl">
                  No spreadsheets. No guesswork. Just trusted pricing you can
                  count on.
                </p>}
                <div className="flex max-lg:text-left flex-col gap-2.5 lg:gap-5 py-2.5">
                  {[...Array(2)].map((_, colIdx) => {
                    const chunk = ctaPoints.slice(colIdx * 2, colIdx * 2 + 2);
                    return (
                      <ul
                        key={colIdx}
                        className="flex flex-col max-lg:gap-2.5 lg:flex-row lg:items-center justify-between"
                      >
                        {chunk.map((review, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-[7.5px] min-w-60"
                          >
                            <span className="bg-primary flex items-center justify-center text-white border border-primary rounded-full size-[18px] text-[8px]">
                              <FaCheck />
                            </span>
                            <p className="text-xs lg:text-lg">{review}</p>
                          </li>
                        ))}
                      </ul>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta2;
