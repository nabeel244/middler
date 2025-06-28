"use client";
import { useEffect, useState } from "react";

export default function Result({ loading = false }) {
  const [data, setData] = useState(null);

  /* fetch most-recent answer set */
  useEffect(() => {
    const getLatest = async () => {
      try {
        const res = await fetch("/api/latest");
        if (res.ok) setData(await res.json());
      } catch (err) {
        console.error("Failed to load latest result:", err);
      }
    };
    getLatest();
  }, []);

  /* while loading or no data, show nothing */
  if (!data) return null;

  /* ---------- helpers ---------- */
  const toMoney = (n) =>
    Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2 });

  const priceBoxes = [
    { lbl: "Interior Estimate", val: data.interiorPrice },
    { lbl: "Cabinets Estimate", val: data.cabinetsPrice },
    { lbl: "Exterior Estimate", val: data.exteriorPrice },
    { lbl: "Total Estimate", val: data.totalPrice },
  ];

  const itemsPainted = data.paintItems || [];
  const extras = Array.isArray(data.extraItems) ? data.extraItems : [];

  /* ---------- UI ---------- */
  return (
    <div
      className={`rounded-3xl max-lg:w-full bg-[#EAF5FF]/60 px-4 py-6 lg:p-16 ${loading ? "pointer-events-none" : ""
        }`}
    >
      <div className="flex flex-col gap-6 lg:gap-12 items-center">
        {/* header */}
        <header className="flex flex-col text-center gap-3 lg:gap-5">
          <h2 className="text-black font-bold text-[26px] lg:text-4xl">
            🎉Estimate Complete!
          </h2>
          <p className="text-[#1F2937] text-sm lg:text-lg">
            Your price breakdown including labor, materials, and paint is ready.
          </p>
        </header>

        {/* price grid */}
        <section className="flex flex-col">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {priceBoxes.map(({ lbl, val }) => (
              <div
                key={lbl}
                className="py-5 px-3 lg:py-8 lg:px-10 text-center bg-gradient-to-l from-[#275FF6] to-[#0039D4] rounded-[10px]"
              >
                <h5 className="text-white font-bold text-xs lg:text-xl mb-3 lg:mb-4">
                  {lbl}
                </h5>
                <p className="text-white font-semibold text-xl lg:text-3xl">
                  ${toMoney(val)}
                </p>
              </div>
            ))}
          </div>

          {/* interior details */}
          <div className="flex flex-col gap-6 items-start w-full border-b border-b-neutral-300 my-4 lg:my-6 pb-4 lg:pb-6">
            <h3 className="text-xl lg:text-3xl font-semibold text-black py-1 px-2.5 relative inline-block after:absolute after:top-full after:left-0 after:bg-primary after:w-full after:h-0.5">
              Interior
            </h3>

            <div className="flex justify-between items-center w-full">
              <div className="text-[#595858] text-xs lg:text-lg flex gap-2">
                <span className="font-semibold text-black">Interior Sqft:</span>
                <span>{data.squareFeet || "--"}</span>
              </div>
              <div className="text-[#595858] text-xs lg:text-lg flex gap-2 lg:w-[37%]">
                <span className="font-semibold text-black">
                  Interior Condition:
                </span>
                <span>{data.homeCondition || "--"}</span>
              </div>
            </div>

            <div className="flex justify-between items-center w-full">
              <div className="text-[#595858] text-xs lg:text-lg flex gap-2 flex-wrap">
                <span className="font-semibold text-black">
                  Interior Details:
                </span>
                <span>{data.insideDetail || "--"}</span>
              </div>
              <div className="text-[#595858] text-xs lg:text-lg flex gap-2 flex-wrap flex-col lg:w-[37%]">
                <span className="font-semibold text-black">
                  Items to be Painted:
                </span>
                <span className="flex flex-wrap gap-2">
                  {itemsPainted.map((it) => (
                    <span
                      key={it}
                      className="rounded-[30px] bg-[#D3DBF8] text-primary px-2.5 py-[9px]"
                    >
                      {it}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* extras */}
          {extras.length > 0 && (
            <div className="flex flex-col items-start gap-2 lg:gap-5 flex-wrap mb-4 lg:mb-8">
              <h3 className="text-xl lg:text-3xl font-semibold text-black py-1 px-2.5 relative inline-block after:absolute after:top-full after:left-0 after:bg-primary after:w-full after:h-0.5">
                Extras:
              </h3>
              {extras.map((ex, i) => (
                <span
                  key={i}
                  className="rounded-[30px] bg-[#D3DBF8] text-primary px-2.5 py-[9px] text-sm lg:text-lg"
                >
                  {ex.name} – ${toMoney(ex.price)}
                </span>
              ))}
            </div>
          )}

          {/* terms */}
          <div className="flex flex-col items-start gap-2 lg:gap-5 flex-wrap mb-4 lg:mb-8">
            <h3 className="text-xl lg:text-3xl font-semibold text-black py-1 px-2.5 relative inline-block after:absolute after:top-full after:left-0 after:bg-primary after:w-full after:h-0.5">
              Terms
            </h3>
            <div className="text-[#595858] text-xs lg:text-lg">
              <span className="font-semibold text-black">Paint Brand:</span>{" "}
              {data.PaintBrand || "--"}
            </div>
          </div>

          {/* action buttons */}
          <div className="flex items-center gap-2 lg:gap-4">
            {[
              { t: "Print", icon: "print.png" },
              { t: "Save as PDF", icon: "pdf.png" },
              { t: "Resend Email", icon: "send.png" },
            ].map(({ t, icon }) => (
              <button
                key={t}
                className="rounded-[20px] lg:rounded-4xl bg-[#043DD7] hover:bg-primary-800 text-white px-3 lg:px-10 lg:py-5 py-2.5 inline-flex items-center gap-1 lg:gap-3 text-[10px] lg:text-lg font-semibold"
              >
                <img
                  src={`/images/icons/${icon}`}
                  className="max-h-3.5 lg:max-h-7"
                  alt={t}
                />
                <span>{t}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
