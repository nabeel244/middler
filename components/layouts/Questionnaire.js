"use client";
import { questions } from "@/app/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

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
      alert("Responses saved locally in data/responses.json");
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
          className="px-11 min-h-[222px] flex flex-col items-center justify-center gap-7 bg-white shadow[0_6px_46px_rgba(0,0,0,0.2)] rounded-4xl"
        >
          <div className="py-3">
            <h2 className="text-2xl leading-none font-semibold text-[#333333]">
              {current.question}
            </h2>
            {current.description && (
              <p className="mt-2 text-gray-500 text-center">
                {current.description}
              </p>
            )}
          </div>

          {/* RADIO */}
          {current.type === "radio" && (
            <div
              className={`flex flex-wrap gap-5 ${
                current.options.length > 2 ? "flex-col" : ""
              }`}
            >
              {current.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleInput(current.id, opt)}
                  className={`py-3 px-8 min-w-[200px] inline-block rounded-[11px] text-xl text-center font-semibold border-2 border-primary ${
                    opt === "No"
                      ? "bg-transparent text-primary"
                      : "bg-primary text-white"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* CHECKBOX */}
          {current.type === "checkbox" &&
            current.options.map((opt) => (
              <label key={opt} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  value={opt}
                  onChange={(e) => {
                    const prev = answers[current.id] || [];
                    if (e.target.checked) {
                      handleInput(current.id, [...prev, opt]);
                    } else {
                      handleInput(
                        current.id,
                        prev.filter((v) => v !== opt)
                      );
                    }
                  }}
                  className="h-5 w-5 accent-primary"
                />
                <span>{opt}</span>
              </label>
            ))}

          {/* TEXT / NUMBER */}
          {["text", "number"].includes(current.type) && (
            <input
              type={current.type}
              placeholder={current.placeholder}
              onChange={(e) => handleInput(current.id, e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary transition-all"
            />
          )}

          {/* CUSTOM INPUTS */}
          {current.type === "custom-inputs" && (
            <div className="flex flex-col gap-4">
              {customItems.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Item name"
                    value={item.name}
                    onChange={(e) =>
                      updateCustomItem(idx, "name", e.target.value)
                    }
                    className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary transition-all"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) =>
                      updateCustomItem(idx, "price", e.target.value)
                    }
                    className="w-24 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              ))}
              <button
                onClick={addCustomItem}
                className="self-start text-primary font-medium underline"
              >
                + Add Another Item
              </button>
            </div>
          )}

          {/* SKIP BUTTON */}
          {current.skip && (
            <button
              onClick={() => handleNext()}
              className="absolute top-4 right-4 text-sm text-gray-400 hover:text-gray-600"
            >
              Skip
            </button>
          )}

          {current.next && (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`w-full mt-4 py-3 rounded-lg text-white font-semibold transition-colors ${
                canProceed()
                  ? "bg-primary hover:opacity-90"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {current.next}
            </button>
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
