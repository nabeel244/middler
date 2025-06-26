"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const options = [
  { title: "where", btns: ["home", "lowes", "amazon", "other"] },
  { title: "why", btns: ["price", "conveinience", "they deliver", "other"] },
];

export default function Modal2({ onClose }) {
  const [email, setEmail] = useState("");
  const [choice, setChoice] = useState({ where: "", why: "" });
  const [other, setOther] = useState({ where: "", why: "" });
  const [errs, setErrs] = useState({ email: "", where: "", why: "" });

  /* helpers -------------------------------------------------- */
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const whereOk = choice.where &&
    (choice.where !== "other" || other.where.trim() !== "");
  const whyOk = choice.why &&
    (choice.why !== "other" || other.why.trim() !== "");

  const canSend = emailValid && whereOk && whyOk;

  const validate = () => {
    setErrs({
      email: emailValid ? "" : "Please enter a valid email *",
      where: whereOk ? "" : "Select (or enter) where you buy *",
      why: whyOk ? "" : "Select (or enter) why you buy *",
    });
  };

  /* UI ------------------------------------------------------- */
  return (
    <AnimatePresence>
      <motion.div
        key="survey"
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

          {/* -------- option grids -------- */}
          <div className="grid grid-cols-2 gap-3 lg:gap-14">
            {options.map(({ title, btns }) => (
              <div key={title} className="flex flex-col items-center gap-3 uppercase">
                <span className="text-white/80 font-semibold text-xl">{title}</span>

                {/* buttons OR input */}
                {btns.map((btn) =>
                  choice[title] === "other" && btn === "other" ? (
                    <input
                      key="otherInput"
                      placeholder={`Please enter other`}
                      value={other[title]}
                      onChange={(e) =>
                        setOther((o) => ({ ...o, [title]: e.target.value }))
                      }
                      className="rounded-lg min-w-[135px] text-black p-2.5 border-2 border-white bg-white outline-none"
                    />
                  ) : (
                    <button
                      key={btn}
                      onClick={() => {
                        setChoice((c) => ({ ...c, [title]: btn }));
                        if (btn !== "other") {
                          setOther((o) => ({ ...o, [title]: "" }));
                        }
                      }}
                      className={`rounded-lg min-w-[135px] w-full text-black p-2.5 border-2 border-white font-semibold transition-all duration-200 ease-in-out ${choice[title] === btn
                        ? "bg-primary text-white"
                        : "hover:bg-primary hover:text-white bg-white"
                        }`}
                    >
                      {btn}
                    </button>
                  )
                )}
              </div>
            ))}
          </div>

          {/* -------- email + send -------- */}
          <p className="text-white text-xl lg:text-2xl text-center font-medium">
            Please enter the email where we could send your gift card
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (canSend) {
                onClose();
              } else {
                validate();
              }
            }}
            className="w-full overflow-hidden flex flex-col items-center gap-5"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errs.email) setErrs((er) => ({ ...er, email: "" }));
              }}
              className="w-full bg-white px-5 py-3 text-black rounded-full outline-none"
            />

            {/* ------ error messages block ------ */}
            {(errs.email || errs.where || errs.why) && (
              <div className="flex gap-2 flex-wrap -mt-3">
                {errs.email && <small className="text-red-500 bg-neutral-300 px-3 py-1 rounded-full">{errs.email}</small>}
                {errs.where && <small className="text-red-500 bg-neutral-300 px-3 py-1 rounded-full">{errs.where}</small>}
                {errs.why && <small className="text-red-500 bg-neutral-300 px-3 py-1 rounded-full">{errs.why}</small>}
              </div>
            )}

            <button
              type="submit"
              className={`uppercase rounded-xl py-3 px-4 min-w-[150px] cursor-pointer bg-primary text-white`}
            >
              send
            </button>
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
}
