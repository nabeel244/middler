"use client";
import { questions } from "@/app/constants";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { TfiAngleDown } from "react-icons/tfi";

import { RxCheck } from "react-icons/rx";

const variants = {
  enter: { x: 100, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
};

export default function Questionnaire() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [customItems, setCustomItems] = useState([{ name: "", price: "" }]);
  const current = questions[step];
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false); // Close dropdown if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const canProceed = () => {
    if (current.skip) return true;
    const value = answers[current.id];
    if (current.type === "checkbox")
      return Array.isArray(value) && value.length > 0;
    if (current.type === "custom-inputs")
      return customItems.some((i) => i.name && i.price);
    return value !== undefined && value !== "";
  };

  const handleNext = async () => {
    if (!canProceed()) return;
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      await submit();
    }
  };

  const submit = async () => {
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      router.push("/paint-estimator/result");
    } catch (err) {
      alert("Failed to save responses.");
    }
  };

  const handleInput = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const addCustomItem = () => {
    setCustomItems([...customItems, { name: "", price: "" }]);
  };

  const updateCustomItem = (index, key, value) => {
    const updated = [...customItems];
    updated[index][key] = value;
    setCustomItems(updated);
    handleInput(current.id, updated);
  };

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.id}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="lg:px-8 2xl:min-h-[190px] flex flex-col items-center justify-center gap-[30px] lg:gap-6 bg-white shadow[0_6px_46px_rgba(0,0,0,0.2)] rounded-3xl lg:rounded-4xl qsnre"
        >
          <div className="pt-3 text-center">
            <h2 className="text-[26px] leading-[1.2] font-bold text-[#333333]">
              {current.title ? current.title : current.question}
            </h2>
            {current.description && (
              <p
                className={`mt-4 ${current.title
                  ? "text-[#1F2937] font-medium"
                  : "text-neutral-600"
                  } text-center`}
                dangerouslySetInnerHTML={{ __html: current.description }}
              />
            )}

            {current.label && (
              <p className="text-[22px] mt-6 leading-6 text-[#1F2937] font-semibold">
                {current.label}
              </p>
            )}
          </div>

          {current.type === "radio" && (
            <div
              className={`flex flex-wrap gap-5 ${current.options.length > 2 ? "flex-col" : ""
                }`}
            >
              {current.options.map((opt) => {
                const selected = answers[current.id] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, [current.id]: opt }));
                      if (!current.next) {
                        setStep((prev) =>
                          Math.min(prev + 1, questions.length - 1)
                        );
                      }
                    }}
                    className={`py-2.5 lg:py-3 px-8 min-w-[140px] lg:min-w-[200px] inline-block rounded-[11px] text-xl text-center font-semibold border-2 border-primary transition-all duration-300 ease-in-out cursor-pointer ${selected
                      ? opt === "No"
                        ? "bg-transparent text-primary"
                        : "bg-transparent text-primary"
                      : opt === "No"
                        ? "bg-transparent text-primary"
                        : "bg-primary text-white"
                      }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {current.type === "multipleOptions" && (
            <div className="rounded-2xl border border-[#E5E7EB] w-full overflow-hidden">
              {current.options.map((opt, i) => {
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
                    className="flex items-center w-full gap-3 p-3 not-last:border-b border-b-[#E5E7EB] cursor-pointer hover:bg-[#F9FAFB] transition-all duration-300 ease-in-out"
                  >
                    <span
                      className={`size-5 rounded-[7px] border flex items-center justify-center text-3xl text-white ${selected
                        ? "border-primary bg-primary"
                        : "border-[#868C8F]"
                        }`}
                    >
                      {selected ? <RxCheck /> : null}
                    </span>
                    <span className="text-[#1F2937] tracking-[1px] text-[15px]">
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          )}


          {current.type === "text_dropdown" && (
            <div className="relative w-full">
              <div
                className="flex items-center justify-between border border-[#656E81] rounded-[20px] px-5 py-3 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span
                  className={`text-[13px] lg:text-lg tracking-[1px] ${answers[current.id]
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
                  className="absolute w-full mt-2 lg:mt-1 bg-white shadow-[0_0_20px] shadow-black/20 rounded-[10px] z-10 max-h-[510px] lg:max-h-[260px] overflow-y-auto dropdown"
                >
                  {current.options.map((opt, idx) => {
                    const isSelected = answers[current.id] === opt;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          handleInput(current.id, opt);
                          setShowDropdown(false);
                        }}
                        className={`flex items-center gap-3 px-5 py-2 first:pt-5 last:pb-4 cursor-pointer ${isSelected
                          ? "bg-primary/15"
                          : "text-[#656E81]  hover:bg-primary/5"
                          }`}
                      >
                        <span className="text-sm lg:text-lg leading-[22px] tracking-[0.5px]">
                          {opt}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {["text", "number"].includes(current.type) && (
            <input
              type={current.type}
              placeholder={current.placeholder}
              onChange={(e) => handleInput(current.id, e.target.value)}
              className="w-full border border-[#656E81] rounded-[20px] px-5 py-3 outline-none shadow-[0_2px_30px] shadow-black/20 focus:ring focus:ring-primary focus:border-primary transition-all duration-300 ease-in-out"
            />
          )}

          {current.type === "custom-inputs" && (
            <>
              <div className="flex flex-col gap-x-4 gap-y-6 w-full relative">
                {customItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex max-lg:flex-col gap-5 lg:gap-3 relative"
                  >
                    <div className="w-full lg:w-1/2">
                      <label className="block mb-2 text-base leading-[22px] font-medium text-[#1F2937] tracking-[1px]">
                        Item {idx + 1}
                      </label>
                      <input
                        type="text"
                        placeholder="ex. bookcase"
                        value={item.name}
                        onChange={(e) =>
                          updateCustomItem(idx, "name", e.target.value)
                        }
                        className="w-full border border-[#656E81] rounded-[20px] px-5 py-2.5 outline-none shadow-[0_2px_30px] shadow-black/20 focus:ring focus:ring-primary focus:border-primary transition-all duration-300 ease-in-out"
                      />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <label className="block mb-2 text-base leading-[22px] font-medium text-[#1F2937] tracking-[1px]">
                        Price {idx + 1}
                      </label>
                      <div className="w-full relative">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            updateCustomItem(idx, "price", e.target.value)
                          }
                          className="w-full block border border-[#656E81] rounded-[20px] px-5 pl-10 py-2.5 outline-none shadow-[0_2px_30px] shadow-black/20 focus:ring focus:ring-primary focus:border-primary transition-all duration-300 ease-in-out"
                        />
                        <span className="absolute top-1/2 -translate-y-1/2 left-5 text-neutral-500 pointer-events-none">
                          $
                        </span>
                      </div>
                    </div>
                    {idx > 0 && (
                      <button
                        onClick={() => {
                          const updatedItems = customItems.filter(
                            (_, i) => i !== idx
                          );
                          setCustomItems(updatedItems);
                          handleInput(current.id, updatedItems);
                        }}
                        className="absolute right-0 top-0 flex place-items-center text-white text-lg bg-black cursor-pointer hover:shadow-[0_0_5px_2px] shadow-black/30 rounded-full p-0.5 transition-all duration-300 ease-in-out"
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
                className="flex items-center justify-between border border-[#656E81] rounded-[20px] px-5 py-3 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span
                  className={`text-lg tracking-[1px] ${answers[current.id]
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
                  className="absolute w-full mt-2 lg:mt-1 bg-white shadow-[0_0_20px] shadow-black/20 rounded-[10px] z-10 max-h-[480px] lg:max-h-[260px] xl:max-h-[380px] overflow-y-auto dropdown"
                >
                  {current.options.map((opt, idx) => {
                    const isSelected = answers[current.id] === opt;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          handleInput(current.id, opt);
                          setShowDropdown(false);
                        }}
                        className={`flex items-center gap-3 px-3 py-3 lg:py-2 cursor-pointer ${isSelected
                          ? "bg-primary/15"
                          : "text-[#1F2937]  hover:bg-primary/5"
                          }`}
                      >
                        <div className="size-10 lg:size-[60px] p-1 lg:p-2.5 flex items-center justify-center bg-white shadow-[0_3px_10px] shadow-black/15 rounded-full">
                          <img
                            src={`/images/brands/${idx + 1}.png`}
                            alt={opt}
                          />
                        </div>
                        <span className="lg:text-lg lg:leading-[22px] tracking-[0.5px]">
                          {opt}
                        </span>
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
                <button onClick={() => handleNext()} className="qsnre_btn">
                  Skip
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                aria-label={current.next}
                title={
                  canProceed()
                    ? current.next
                    : "Please fill out all required fields"
                }
                className={`qsnre_btn`}
              >
                {current.next}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar */}
      {/* <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${((step + 1) / questions.length) * 100}%` }}
        />
      </div> */}
    </>
  );
}
