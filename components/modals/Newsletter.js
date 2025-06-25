"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const Newsletter = ({ onClose }) => {
  const [email, setEmail] = useState("");

  return (
    <AnimatePresence>
      <motion.div
        key="newsletter"
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
          className="w-auto max-w-[90%] sm:max-w-[320px] lg:max-w-[768px] rounded-xl bg-[#052F46] text-white px-10 py-8 shadow-lg flex flex-col items-center gap-6 lg:gap-7"
        >
          <h2 className="text-center font-bold text-[26px] lg:text-[40px] leading-[1.3]">
            Keep These Prices & Get Details of This Project Sent To Your Email
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="w-full overflow-hidden flex flex-col items-center gap-6 lg:gap-7"
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white px-5 py-3 text-black rounded-full outline-none"
            />
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-primary text-white uppercase rounded-xl py-3 px-4 min-w-[150px]"
              >
                send
              </button>
            </div>
          </form>

          <p className="text-white text-[22px] lg:text-2xl text-center">
            We have <span className="font-semibold">HUGE DISCOUNTS</span> for
            everything in the painting world and we’ll hook you up with those as
            well!
          </p>
          <button
            onClick={onClose}
            className="text-white/70 text-lg lg:text-xl leading-[22px] lg:leading-7 underline hover:text-white transition-all duration-200 ease-in-out"
          >
            No Thanks
          </button>

          <img src="/images/icons/fav.png" className="w-20 lg:w-32" alt="" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Newsletter;
