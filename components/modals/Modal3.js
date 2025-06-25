"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const optionSets = [
  { key: "where", btns: ["home", "lowes", "amazon", "other"] },
  { key: "why", btns: ["price", "conveinience", "they deliver", "other"] },
];

const Modal3 = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [choice, setChoice] = useState({ where: "", why: "" });
  const [other, setOther] = useState("");
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const whereChosen =
    choice.where === "other" ? !!other.trim() : !!choice.where;
  const whyChosen = !!choice.why;
  const canSend = emailValid && (whereChosen || whyChosen);

  return (
    <AnimatePresence>
      <motion.div
        key="survey2"
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
          className="w-auto max-w-[90%] sm:max-w-[320px] lg:max-w-[800px] rounded-xl bg-[#052F46] text-white px-10 py-8 shadow-lg flex flex-col items-center gap-6 lg:gap-5"
        >
          <p className="text-white text-[22px] lg:text-2xl text-center">
            Tell us where you like to buy your stuff and why to win a
          </p>
          <h2 className="text-center font-bold text-[26px] lg:text-[40px] leading-[1.3]">
            $500 Gift Card!
          </h2>
          <div className="grid grid-cols-2 gap-3 lg:gap-14">
            {optionSets.map(({ key, btns }) => (
              <div
                key={key}
                className="flex flex-col items-center gap-3 uppercase"
              >
                <span className="text-white/80 font-semibold text-xl">
                  {key}
                </span>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {btns.map((btn) =>
                    key === "where" && btn === "other" ? (
                      <input
                        key={btn}
                        placeholder="Please enter other"
                        value={other}
                        onChange={(e) => {
                          setChoice((c) => ({ ...c, where: "other" }));
                          setOther(e.target.value);
                        }}
                        className="rounded-lg min-w-[135px] text-black p-2.5 border-2 border-white bg-white font-semibold text-sm"
                      />
                    ) : (
                      <button
                        key={btn}
                        onClick={() => setChoice((c) => ({ ...c, [key]: btn }))}
                        className={`rounded-lg min-w-[135px] text-black p-2.5 border-2 border-white bg-white font-semibold transition-all duration-200 ease-in-out ${
                          choice[key] === btn
                            ? "bg-primary text-white"
                            : "hover:bg-primary hover:text-white"
                        }`}
                      >
                        {btn}
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-white text-xl lg:text-2xl text-center font-medium">
            Please enter the email where we could send your gift card
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (canSend) onClose();
            }}
            className="w-full overflow-hidden flex flex-col items-center gap-6 lg:gap-7"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white px-5 py-3 text-black rounded-full outline-none"
            />
            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={!canSend}
                className={`uppercase rounded-xl py-3 px-4 min-w-[150px] ${
                  canSend
                    ? "bg-primary text-white"
                    : "bg-primary text-white cursor-not-allowed"
                }`}
              >
                send
              </button>
            </div>
          </form>
          <button
            onClick={onClose}
            className="text-white/70 text-lg lg:text-xl leading-[22px] lg:leading-7 underline hover:text-white transition-all duration-200 ease-in-out"
          >
            No Thanks
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal3;
