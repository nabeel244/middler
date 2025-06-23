"use client";
import { AnimatePresence, motion } from "motion/react"; // same motion lib
import { useEffect, useState } from "react";

export default function ResultPage() {
  const [showLoader, setShowLoader] = useState(true);
  const [stage, setStage] = useState(0);

  const steps = [
    "🔍 Gathering room size & details…",
    "📈 Analyzing market rates & trends…",
    "🛠️ Computing labor & material cost…",
    "✅ Finalizing transparent pricing…",
  ];

  useEffect(() => {
    if (!showLoader) return;

    const i = setInterval(() => {
      setStage((s) => {
        if (s === steps.length) {
          clearInterval(i);
          setTimeout(() => setShowLoader(false), 500);
          return s;
        }
        return s + 1;
      });
    }, 1000);

    return () => clearInterval(i);
  }, [showLoader]);

  return (
    <div className="relative min-h-screen bg-slate-50">
      <div className={showLoader ? "pointer-events-none blur-sm" : ""}>

      </div>

      <AnimatePresence>
        {!showLoader && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="w-[290px] sm:w-[320px] rounded-xl bg-[#002030] text-white p-6 shadow-lg"
            >
              <h2 className="text-center font-bold text-xl leading-6">
                Calculating&nbsp;Your <br /> Custom&nbsp;Prices
              </h2>
              <p className="text-center text-[13px] mt-2 text-neutral-300">
                Middler does <span className="text-red-400 font-semibold">NOT</span> adjust prices
                to benefit painters or homeowners.
              </p>

              <div className="h-2 w-full bg-[#072d43] rounded-full mt-5 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                  animate={{ width: `${(stage / steps.length) * 100}%` }}
                  transition={{ ease: "linear", duration: 0.3 }}
                />
              </div>

              <ul className="mt-4 space-y-1 text-sm">
                {steps.map((txt, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-1.5 ${i < stage ? "text-white" : "text-teal-200/40"
                      }`}
                  >
                    {txt}
                  </li>
                ))}
                {stage === steps.length && (
                  <li className="text-lg font-extrabold text-amber-300 mt-3">
                    🎉 Your pricing breakdown is ready!
                  </li>
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
