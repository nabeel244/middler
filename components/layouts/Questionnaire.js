"use client";

import { questions } from "@/app/constants";
import {
  calculateCabinetsEstimate,
  calculateExteriorEstimate,
  calculateInteriorEstimate,
} from "@/helpers/calculation";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { RxCheck } from "react-icons/rx";
import { TfiAngleDown } from "react-icons/tfi";
import LoadingOverlay from "../modals/LoadingOverlay";

const INSIDE_QS = ["squareFeet", "paintItems", "homeCondition", "insideDetail"];
const CAB_QS = [
  "cabinetsNo",
  "cabinetsInsidePainting",
  "cabinetsCondition",
  "cabinetsDetail",
];
const OUTSIDE_QS = [
  "outsideSquareFeet",
  "outsidePaintItems",
  "outsideCondition",
  "outsideDetail",
];

const itemSlug = {
  Walls: "walls",
  Ceilings: "ceilings",
  "Crown Molding": "crown_molding",
  "Interior Door": "interior_doors",
  "Baseboard and Trims": "baseboards_and_trim",
  "Window + Patio Doors": "windows_patio_doors",
  "Stairs Railing + Spindles": "stair_railing_spindles",
};

const detailSlug = (txt = "") =>
  txt.toLowerCase().includes("very")
    ? "very_detailed"
    : txt.toLowerCase().includes("some")
    ? "some_detail"
    : "";

const variants = {
  enter: { x: 100, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
};

export default function Questionnaire() {
  const [answers, setAnswers] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem("paintAnswers") || "{}");
    } catch {
      return {};
    }
  });

  const [step, setStep] = useState(() => {
    if (typeof window === "undefined") return 0;
    return Number(localStorage.getItem("paintStep") || 0);
  });

  const [customItems, setCustomItems] = useState([{ name: "", price: "" }]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef(null);
  const router = useRouter();
  const current = questions[step];

  useEffect(() => {
    const clickOut = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", clickOut);
    return () => document.removeEventListener("mousedown", clickOut);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("paintAnswers", JSON.stringify(answers));
      localStorage.setItem("paintStep", String(step));
    }
  }, [answers, step]);

  const nextIndex = (i) => {
    let n = i + 1;

    while (n < questions.length) {
      const id = questions[n].id;

      if (answers.insidePainting === "No" && INSIDE_QS.includes(id)) {
        if (id !== "insideExtraItems") {
          n++;
          continue;
        }
      }

      if (answers.cabinetsPainting === "No" && CAB_QS.includes(id)) {
        if (id !== "outsidePainting") {
          n++;
          continue;
        }
      }

      if (answers.outsidePainting === "No" && OUTSIDE_QS.includes(id)) {
        if (id !== "outsideExtraItems") {
          n++;
          continue;
        }
      }

      break;
    }

    return n;
  };

  const canProceed = () => {
    if (current.skip) return true;
    const v = answers[current.id];
    if (current.type === "multipleOptions") return Array.isArray(v) && v.length;
    if (current.type === "custom-inputs")
      return customItems.some((i) => i.name && i.price);
    return v !== undefined && v !== "";
  };

  const handleInput = (id, value) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const toSlug = (txt = "") => txt.toLowerCase().replace(/\s+/g, "_");

  const submit = async () => {
    setLoading(true);
    try {
      const calcInput = {
        ...answers,
        interiorSquareFeet: Number(answers.squareFeet) || 0,
        interiorItems: (answers.paintItems || []).map((lbl) => ({
          type: toSlug(lbl.replace("+", "&")),
        })),
        interiorCondition: toSlug(answers.homeCondition),
        interiorDetail: toSlug(answers.insideDetail),
        doorsAndDrawers: Number(answers.cabinetsNo) || 0,
        paintBrand: toSlug(answers.PaintBrand),
        paintQuality: "standard",
        interiorIndividualItems: answers.insideExtraItems || [],
        exteriorIndividualItems: answers.outsideExtraItems || [],
      };

      const interiorPrice = Number(await calculateInteriorEstimate(calcInput));
      const cabinetsPrice = Number(await calculateCabinetsEstimate(calcInput));
      const exteriorPrice = Number(await calculateExteriorEstimate(calcInput));
      const totalPrice = interiorPrice + cabinetsPrice + exteriorPrice;

      const enriched = {
        ...calcInput,
        interiorPrice,
        cabinetsPrice,
        exteriorPrice,
        totalPrice,
      };

      localStorage.setItem("paintAnswers", JSON.stringify(enriched));

      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enriched),
      });

      localStorage.removeItem("paintStep");
      router.push("/paint-estimator/result");
    } catch (err) {
      console.error("Estimator calc error:", err);
      alert("Failed to save responses.");
      setLoading(false);
    }
  };

  // ─────  custom‑input helpers ────────────────
  const addCustomItem = () =>
    setCustomItems((c) => [...c, { name: "", price: "" }]);
  const updateCustomItem = (i, k, v) => {
    const u = [...customItems];
    u[i][k] = v;
    setCustomItems(u);
    handleInput(current.id, u);
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.id}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`lg:px-8 2xl:min-h-[190px] flex flex-col items-center justify-center gap-[30px] lg:gap-6 bg-white shadow[0_6px_46px_rgba(0,0,0,0.2)] rounded-3xl lg:rounded-4xl qsnre ${
            loading ? "pointer-events-none" : ""
          }`}
        >
          <div className="pt-3 text-center">
            <h2 className="text-[26px] font-bold text-[#333]">
              {current.title ? current.title : current.question}
            </h2>
            {current.description && (
              <p
                className={`mt-4 ${
                  current.title
                    ? "text-[#1F2937] font-medium"
                    : "text-neutral-600"
                } text-center`}
                dangerouslySetInnerHTML={{ __html: current.description }}
              />
            )}
            {current.label && (
              <p className="text-[22px] mt-6 text-[#1F2937] font-semibold">
                {current.label}
              </p>
            )}
          </div>

          {current.type === "radio" && (
            <>
              <div
                className={`flex flex-wrap gap-5 ${
                  current.options.length > 2 ? "flex-col" : ""
                }`}
              >
                {current.options.map((opt) => {
                  const selected = answers[current.id] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        setAnswers((p) => ({ ...p, [current.id]: opt }));
                        if (!current.next) {
                          setStep((p) => Math.min(p + 1, questions.length - 1));
                        }
                      }}
                      className={`py-2.5 px-8 min-w-[140px] rounded-[11px] text-xl font-semibold border-2 border-primary transition ${
                        selected
                          ? "bg-transparent text-primary"
                          : "bg-primary text-white"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {current.suggetions &&
                current.suggetions.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center gap-3"
                  >
                    <p className="text-neutral-700">{item.title}</p>
                    <img
                      src={`/images/cabinets/${item.src}`}
                      className="max-w-20 lg:max-w-24 rounded-xl"
                      alt=""
                    />
                  </div>
                ))}
            </>
          )}

          {current.type === "multipleOptions" && (
            <div className="rounded-2xl border border-[#E5E7EB] w-full overflow-hidden">
              {current.options.map((opt) => {
                const selected = (answers[current.id] || []).includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => {
                      const prev = answers[current.id] || [];
                      const next = selected
                        ? prev.filter((v) => v !== opt)
                        : [...prev, opt];
                      handleInput(current.id, next);
                    }}
                    className="flex items-center w-full gap-3 p-3 border-b last:border-b-0 border-[#E5E7EB] hover:bg-[#F9FAFB]"
                  >
                    <span
                      className={`size-5 rounded-[7px] border flex items-center justify-center ${
                        selected
                          ? "border-primary bg-primary"
                          : "border-[#868C8F]"
                      }`}
                    >
                      {selected ? <RxCheck className="text-white" /> : null}
                    </span>
                    <span className="text-[#1F2937] text-[15px]">{opt}</span>
                  </button>
                );
              })}
            </div>
          )}

          {current.type === "text_dropdown" && (
            <div className="relative w-full">
              <div
                className="flex justify-between border border-[#656E81] rounded-[20px] px-5 py-3 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span
                  className={`text-[13px] lg:text-lg ${
                    answers[current.id]
                      ? "font-medium text-[#1F2937]"
                      : "text-[#868C8F]"
                  }`}
                >
                  {answers[current.id] || current.placeholder}
                </span>
              </div>

              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute w-full mt-2 bg-white shadow-[0_0_20px] shadow-black/20 rounded-[10px] z-10 max-h-[260px] overflow-y-auto dropdown"
                >
                  {current.options.map((opt) => {
                    const isSelected = answers[current.id] === opt;
                    return (
                      <div
                        key={opt}
                        onClick={() => {
                          handleInput(current.id, opt);
                          setShowDropdown(false);
                        }}
                        className={`px-5 py-2 cursor-pointer ${
                          isSelected
                            ? "bg-primary/15 text-[#1F2937]"
                            : "hover:bg-primary/5 text-[#656E81]"
                        }`}
                      >
                        {opt}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {["text", "number"].includes(current.type) && (
            <>
              <input
                type={current.type}
                placeholder={current.placeholder}
                onChange={(e) => handleInput(current.id, e.target.value)}
                className="w-full border border-[#656E81] rounded-[20px] px-5 py-3 shadow-[0_2px_30px] shadow-black/20 focus:ring-primary focus:border-primary outline-none"
              />
              {current.suggetions && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
                  {current.suggetions.map((img, idx) => (
                    <div key={idx}>
                      <img
                        src={`/images/cabinets/${img}`}
                        className="max-w-20 lg:max-w-24 rounded-xl"
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {current.type === "custom-inputs" && (
            <>
              <div className="flex flex-col gap-6 w-full">
                {customItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex max-lg:flex-col gap-5 relative"
                  >
                    <div className="w-full lg:w-1/2">
                      <label className="block mb-2 text-base font-medium text-[#1F2937]">
                        Item {idx + 1}
                      </label>
                      <input
                        type="text"
                        placeholder="ex. bookcase"
                        value={item.name}
                        onChange={(e) =>
                          updateCustomItem(idx, "name", e.target.value)
                        }
                        className="w-full border border-[#656E81] rounded-[20px] px-5 py-2.5 shadow-[0_2px_30px] shadow-black/20 focus:ring-primary focus:border-primary outline-none"
                      />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <label className="block mb-2 text-base font-medium text-[#1F2937]">
                        Price {idx + 1}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            updateCustomItem(idx, "price", e.target.value)
                          }
                          className="w-full border border-[#656E81] rounded-[20px] px-5 pl-10 py-2.5 shadow-[0_2px_30px] shadow-black/20 focus:ring-primary focus:border-primary outline-none"
                        />
                        <span className="absolute top-1/2 -translate-y-1/2 left-5 text-neutral-500">
                          $
                        </span>
                      </div>
                    </div>
                    {idx > 0 && (
                      <button
                        onClick={() => {
                          const updated = customItems.filter(
                            (_, i) => i !== idx
                          );
                          setCustomItems(updated);
                          handleInput(current.id, updated);
                        }}
                        className="absolute right-0 top-0 text-white bg-black rounded-full p-0.5"
                      >
                        <IoCloseOutline />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <button onClick={addCustomItem} className="qsnre_btn">
                  Add Another Item
                </button>
              </div>
            </>
          )}

          {current.type === "dropdown" && (
            <div className="relative w-full">
              <div
                className="flex justify-between border border-[#656E81] rounded-[20px] px-5 py-3 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span
                  className={`text-lg ${
                    answers[current.id]
                      ? "font-medium text-[#1F2937]"
                      : "text-[#868C8F]"
                  }`}
                >
                  {answers[current.id] || current.placeholder}
                </span>
                <span className="text-white bg-black p-[5px] rounded-full shadow-[0_0_10px_3px] shadow-black/30">
                  <TfiAngleDown />
                </span>
              </div>

              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute w-full mt-2 bg-white shadow-[0_0_20px] shadow-black/20 rounded-[10px] z-10 max-h-[320px] overflow-y-auto dropdown"
                >
                  {current.options.map((opt, idx) => {
                    const isSelected = answers[current.id] === opt;
                    return (
                      <div
                        key={opt}
                        onClick={() => {
                          handleInput(current.id, opt);
                          setShowDropdown(false);
                        }}
                        className={`flex items-center gap-3 px-3 py-2 cursor-pointer ${
                          isSelected ? "bg-primary/15" : "hover:bg-primary/5"
                        }`}
                      >
                        <div className="size-10 p-2.5 flex items-center justify-center bg-white shadow-lg rounded-full">
                          <img
                            src={`/images/brands/${idx + 1}.png`}
                            alt={opt}
                          />
                        </div>
                        <span className="lg:text-lg">{opt}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {current.next && (
            <div className="flex flex-col gap-4">
              {current.skip && (
                <button
                  onClick={() => setStep(nextIndex(step))}
                  className="qsnre_btn"
                >
                  Skip
                </button>
              )}
              <button
                onClick={() => {
                  if (step < questions.length - 1) setStep(nextIndex(step));
                  else submit();
                }}
                disabled={!canProceed()}
                aria-label={current.next}
                title={
                  canProceed()
                    ? current.next
                    : "Please fill out all required fields"
                }
                className="qsnre_btn"
              >
                {current.next}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
