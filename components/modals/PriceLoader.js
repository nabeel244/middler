"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function PriceLoader({ onComplete }) {
  const [stage, setStage] = useState(0);
  const steps = [
    "🔍 Gathering room size & details…",
    "📈 Analyzing market rates & trends…",
    "🛠️ Computing labor & material cost…",
    "✅ Finalizing transparent pricing…",
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setStage((s) => {
        if (s === steps.length) {
          clearInterval(id);
          setTimeout(onComplete, 500);
          return s;
        }
        return s + 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [onComplete, steps.length]);

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
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
          className="w-auto max-w-[360px] sm:max-w-[320px] lg:max-w-[768px] rounded-xl bg-[#052F46] text-white px-10 py-8 shadow-lg space-y-6 lg:space-y-7"
        >
          <h2 className="text-center font-bold text-[26px] lg:text-[40px] leading-[1.2]">
            Calculating&nbsp;Your Custom&nbsp;Prices
          </h2>

          <p className="text-center text-sm lg:text-xl text-neutral-300">
            Middler does&nbsp;
            <span className="text-red-400 font-semibold">NOT</span>&nbsp;adjust prices to benefit
            painters or homeowners.
          </p>

          <div className="h-3 lg:h-4 w-full bg-[#496877] rounded-r-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#052F46] from-0% via-[#4496FF] via-50% to-100% to-[#6A73FF]"
              animate={{ width: `${(stage / steps.length) * 100}%` }}
              transition={{ ease: "linear", duration: 0.3 }}
            />
          </div>

          <ul className="space-y-1 text-sm lg:text-base">
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
              <li className="text-[26px] lg:text-4xl text-center font-extrabold text-white mt-6 lg:mt-7">
                🎉Your pricing breakdown is ready!
              </li>
            )}
          </ul>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
