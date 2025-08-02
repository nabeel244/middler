"use client";
import { AnimatePresence, motion } from "motion/react";
import { IoMdClose } from "react-icons/io";

const GiftPopup = ({
  dispatch,
  changePopup,
  setShowPopUp,
  isMainPage,
  showPopUp,
}) => {
  const handleClose = () => {
    if (!isMainPage) {
      localStorage.setItem("giftCardDismissed", "true");
      dispatch(changePopup(""));
    } else {
      setShowPopUp(false);
    }
  };

  return (
    <AnimatePresence>
      {showPopUp && (
        <motion.div
          key="survey"
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="w-auto max-w-[90%] sm:max-w-[320px] lg:max-w-[800px] xl:max-w-[1024px] rounded-xl bg-white text-black shadow-lg grid lg:grid-cols-2 overflow-hidden"
          >
            <div className="py-3 sm:py-5 px-10 flex flex-col gap-2.5 items-center text-center relative">
              <button
                onClick={handleClose}
                className="absolute top-5 left-4 text-lg lg:text-xl p-0.5 lg:p-1 border-2 border-black flex items-center justify-center rounded-full hover:text-white hover:bg-black transition-all duration-300 ease-in-out cursor-pointer"
              >
                <IoMdClose />
              </button>
              <div className="flex flex-col items-center relative gap-[15px] text-center">
                <img
                  src="/images/logo.png"
                  className="max-w-[124px] lg:max-w-[128px] mb-1 sm:mb-5"
                  alt=""
                />
                <img
                  src="/images/tag.png"
                  className="max-w-[40px] sm:max-w-[65px]"
                  alt=""
                />
                <h1 className="text-[#003058] text-2xl sm:text-4xl lg:text-[50px] font-bold lg:leading-[50px] sm:mb-4 uppercase">
                  Take 10% off
                </h1>
                <p className="text-xs sm:text-sm lg:text-base text-[#0B0B0B] sm:mb-4 lg:leading-[22px]">
                  Book now and save on your first completed service up to $500
                </p>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#0B0B0B] text-sm lg:text-base leading-[22px]">
                    Hurry! offer expire in
                  </span>
                  <div className=" flex items-center gap-[5px]">
                    <div className="p-[5px] rounded-sm bg-[#E9EEF1] text-[#0B0B0B] lg:text-base lg:leading-[22px]">
                      09
                    </div>
                    <span>:</span>
                    <div className="p-[5px] rounded-sm bg-[#E9EEF1] text-[#0B0B0B] lg:text-base lg:leading-[22px]">
                      20
                    </div>
                  </div>
                </div>
                <button className="bg-[#F13F0E] hover:bg-red-700 transition-all duration-300 ease-in-out py-2.5 px-3 rounded-md text-xl lg:leading-[50px] align-middle text-white w-full">
                  Book Now
                </button>
              </div>
              <p className="text-[12px] sm:text-[15px] leading-[22px]">
                Cannot be combined wth other offers
              </p>
            </div>
            <div className="size-full bg-[url('/images/modals/gift.png')] bg-cover bg-no-repeat scale-y-[1.02] min-h-[180px] sm:min-h-[215px]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GiftPopup;
