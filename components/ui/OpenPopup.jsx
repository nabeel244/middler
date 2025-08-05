"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const OpenPopup = ({ showPopUp, setShowPopUp }) => {
  const [hideNow, setHideNow] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(false);

  useEffect(() => {
    if (!showPopUp) setHideNow(false);
  }, [showPopUp]);

  const handleClick = () => {
    setPendingOpen(true);
    setHideNow(true);
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (pendingOpen) {
          setShowPopUp(true);
          setPendingOpen(false);
        }
      }}
    >
      {!hideNow && !showPopUp && (
        <motion.button
          key="review"
          onClick={handleClick}
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed bottom-5 right-5 rounded-xl bg-[#F13F0E] border border-[#F13F0E] hover:shadow-[0_0_20px] shadow-[#F13F0E]/40 hover:-translate-y-2 text-white z-[999] px-4 lg:px-5 py-1.5 lg:py-2 transition-all duration-300 ease-in-out cursor-pointer"
        >
          Review
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default OpenPopup;
