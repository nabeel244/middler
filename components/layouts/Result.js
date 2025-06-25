"use client";
import { useEffect, useState } from "react";

const Result = ({ loading = false }) => {
  const [ans, setAns] = useState(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("paintAnswers");
    if (raw) setAns(JSON.parse(raw));
  }, []);

  if (!ans) return null;

  const estimate = [
    { title: "Interior Estimate", price: ans.interiorPrice || 0 },
    { title: "Cabinets Estimate", price: ans.cabinetsPrice || 0 },
    { title: "Exterior Estimate", price: ans.exteriorPrice || 0 },
    { title: "Total Estimate", price: ans.totalPrice || 0 },
  ];

  const btns = [
    { title: "Print", icon: "print.png" },
    { title: "Save as PDF", icon: "pdf.png" },
    { title: "Resend Email", icon: "send.png" },
  ];

  const itemsPainted = ans.paintItems || [];
  const extras = Array.isArray(ans.extraItems) ? ans.extraItems : [];
  const interiorSqft = ans.squareFeet || "";
  const interiorCondition = ans.homeCondition || "";
  const interiorDetails = ans.insideDetail || "";
  const paintBrand = ans.PaintBrand || "";

  return (
    <div
      className={`rounded-3xl max-lg:w-full bg-[#EAF5FF]/60 px-4 py-6 lg:p-16 ${loading ? "pointer-events-none" : ""
        }`}
    >
      <div className="flex flex-col gap-6 lg:gap-12 items-center">
        <div className="flex flex-col text-center gap-3 lg:gap-5">
          <h2 className="text-black font-bold text-[26px] lg:text-4xl">
            🎉Estimate Complete!
          </h2>
          <p className="text-[#1F2937] text-sm lg:text-lg">
            Your price breakdown including labor, materials, and paint is ready.
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:gap-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {estimate.map((item) => (
              <div
                key={item.title}
                className="py-5 px-3 lg:py-8 lg:px-10 text-center bg-gradient-to-l from-[#275FF6] to-[#0039D4] rounded-[10px]"
              >
                <h5 className="text-white font-bold text-xs lg:text-xl mb-3 lg:mb-4">
                  {item.title}
                </h5>
                <p className="text-white font-semibold text-xl lg:text-3xl">
                  ${item.price}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="flex flex-col gap-6 items-start w-full">
              <h3 className="text-xl lg:text-3xl font-semibold text-black py-1 px-2.5 relative inline-block after:absolute after:top-full after:left-0 after:bg-primary after:w-full after:h-0.5">
                Interior
              </h3>

              <div className="flex justify-between items-center w-full">
                <div className="text-[#595858] text-xs lg:text-lg inline-flex items-center gap-2">
                  <span className="font-semibold text-black">
                    Interior Sqft:
                  </span>
                  <span>{interiorSqft}</span>
                </div>
                <div className="text-[#595858] text-xs lg:text-lg lg:min-w-[400px] inline-flex items-center gap-2">
                  <span className="font-semibold text-black">
                    Interior Condition:
                  </span>
                  {interiorCondition}
                </div>
              </div>

              <div className="flex justify-between items-center w-full">
                <div className="text-[#595858] text-xs lg:text-lg flex-wrap inline-flex items-center gap-2">
                  <span className="font-semibold text-black">
                    Interior Details:
                  </span>
                  {interiorDetails}
                </div>
                <div className="text-[#595858] text-xs lg:text-lg lg:min-w-[400px] flex-wrap inline-flex items-center gap-2">
                  <span className="font-semibold text-black">
                    Items to be Painted:
                  </span>
                  {itemsPainted.map((it) => (
                    <span
                      key={it}
                      className="rounded-[30px] bg-[#D3DBF8] text-primary px-2.5 py-[9px]"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {extras.length > 0 && (
              <div className="flex flex-col items-start flex-wrap gap-2 lg:gap-5">
                <h3 className="text-xl lg:text-3xl font-semibold text-black py-1 px-2.5 relative inline-block after:absolute after:top-full after:left-0 after:bg-primary after:w-full after:h-0.5">
                  Extras:
                </h3>
                {extras.map((ex, i) => (
                  <span
                    key={i}
                    className="rounded-[30px] bg-[#D3DBF8] text-primary px-2.5 py-[9px] text-sm lg:text-lg"
                  >
                    {ex.name} - ${ex.price}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col items-start flex-wrap gap-2 lg:gap-5">
            <h3 className="text-xl lg:text-3xl font-semibold text-black py-1 px-2.5 relative inline-block after:absolute after:top-full after:left-0 after:bg-primary after:w-full after:h-0.5">
              Terms
            </h3>
            <div className="text-[#595858] text-xs lg:text-lg">
              <span className="font-semibold text-black">Paint Brand:</span>{" "}
              {paintBrand}
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            {btns.map((btn) => (
              <button
                key={btn.title}
                className="rounded-[20px] lg:rounded-4xl bg-[#043DD7] hover:bg-primary-800 text-white px-3 lg:px-10 lg:py-5 py-2.5 inline-flex items-center gap-1 lg:gap-3 text-[10px] lg:text-lg font-semibold"
              >
                <img
                  src={`/images/icons/${btn.icon}`}
                  className="max-h-3.5 lg:max-h-7"
                  alt={btn.title}
                />
                <span>{btn.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
