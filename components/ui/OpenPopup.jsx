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
          className="fixed bottom-5 left-5 lg:left-auto lg:right-5 rounded-lg bg-black text-white hover:shadow-[0_0_20px] shadow-blue-600/40 hover:-translate-y-2 z-[999] px-4 lg:px-5 py-1.5 lg:py-2 transition-all duration-300 ease-in-out cursor-pointer"
        >
          10% Off Five Star Painter
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default OpenPopup;
