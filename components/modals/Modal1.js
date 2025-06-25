"use client";
import { AnimatePresence, motion } from "motion/react";

const options = [
  { title: "Homeowner", icon: "home.png" },
  { title: "Painter", icon: "painter.png" },
  { title: "Handyman", icon: "handyman.png" },
  { title: "Others", icon: "others.png" },
];

const Modal1 = ({ onSelect }) => (
  <AnimatePresence>
    <motion.div
      key="role-modal"
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
        className="w-auto max-w-[360px] sm:max-w-[320px] lg:max-w-[768px] rounded-xl bg-white text-primary px-10 py-8 shadow-lg space-y-6 lg:space-y-7"
      >
        <h2 className="text-center font-bold text-[26px] lg:text-[40px] leading-[1.2]">
          Most accurate paint estimate there is for your project!
        </h2>

        <div className="h-3 lg:h-4 w-full bg-[#496877] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#052F46] via-[#4496FF] to-[#6A73FF]" />
        </div>

        <div className="grid grid-cols-2 gap-3 lg:gap-6">
          {options.map(({ title, icon }) => (
            <button
              key={title}
              type="button"
              onClick={() => onSelect(title)}
              className="py-5 px-8 lg:py-8 cursor-pointer bg-primary text-white gap-2 lg:gap-4 flex flex-col items-center rounded-lg"
            >
              <img
                src={`/images/icons/${icon}`}
                alt={title}
                className="max-h-8 lg:max-h-12"
              />
              <span className="text-xs lg:text-lg font-bold uppercase">{title}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

export default Modal1;
