"use client";
import { useMutation } from "@apollo/client";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BiLoaderCircle } from "react-icons/bi";

/* ─── APOLLO ─────────────────────────────────────────────── */
import QUICK_ESTIMATE from "../../app/_mutations/quickEstimateClient";
import InputFieldText from "../form/inputFieldText";

/* ─────────────────────────────────────────────────────────── */
const EmailType = ({
  dispatch,
  changePopup,
  changePopupType,
  navigation,
  estimator,
  paintEstimateFieldsRequired,
  changePaintEstimator,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState("");
  const [userType, setUserType] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [, setCookie] = useCookies(["estimateID"]);

  /* ─── APOLLO ───────────────────────────────────────────── */
  const [quickEstimate] = useMutation(QUICK_ESTIMATE);

  /* ─── POPUP FLOW CONTROL ───────────────────────────────── */
  useEffect(() => {
    dispatch(changePopupType(""));
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, [dispatch, changePopupType]);

  useEffect(() => {
    const id = setTimeout(() => dispatch(changePopupType("email")), 7000);
    return () => clearTimeout(id);
  }, [dispatch, changePopupType]);

  /* ─── SUBMIT HANDLER ───────────────────────────────────── */
  const submitSendEstimate = async (role) => {
    setLoading("sendEstimate");
    try {
      const { data } = await quickEstimate({
        variables: { estimate: { ...estimator.value, userType: role } },
      });

      /* save estimateID for a year */
      const expires = new Date(Date.now() + 31536000000);
      setCookie("estimateID", data.quickEstimateClient.id, {
        expires,
        path: "/",
        sameSite: "lax",
      });

      /* reveal preview, hide popup */
      dispatch(changePaintEstimator(5));
      dispatch(changePopup(""));

      /* update URL without reloading */
      router.replace(`${window.location.pathname}?success=1`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading("");
    }
  };

  /* ─── RENDER ───────────────────────────────────────────── */
  return (
    <AnimatePresence>
      {/* first phase (loader) */}
      {navigation.value.popupType === "" && (
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
              <span className="text-red-400 font-semibold">NOT</span>
              &nbsp;adjust prices to benefit painters or homeowners.
            </p>
            <div className="h-3 lg:h-4 w-full bg-[#496877] rounded-r-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#052F46] via-[#4496FF] to-[#6A73FF]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* second phase (role selection) */}
      {navigation.value.popupType === "email" && (
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
            className="w-auto max-w-[360px] sm:max-w-[320px] lg:max-w-[768px] rounded-xl bg-white text-primary px-10 py-8 shadow-lg space-y-6 lg:space-y-7 relative"
          >
            <h2 className="text-center font-bold text-[26px] lg:text-[40px]">
              Most accurate paint estimate there is for your project!
            </h2>

            <div className="h-3 lg:h-4 w-full bg-[#496877] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#052F46] via-[#4496FF] to-[#6A73FF]" />
            </div>

            <div className="grid grid-cols-2 gap-3 lg:gap-6">
              {["homeowner", "painter", "handyman"].map((r) => (
                <button
                  key={r}
                  onClick={() => submitSendEstimate(r)}
                  className="w-full py-5 px-8 lg:py-8 bg-primary text-white flex flex-col items-center rounded-lg gap-2"
                >
                  <img
                    src={`/images/icons/${r}.png`}
                    alt={r}
                    className="max-h-8 lg:max-h-12"
                  />
                  <span className="text-xs lg:text-lg font-bold uppercase">
                    {r}
                  </span>
                </button>
              ))}

              {!showOtherInput ? (
                <button
                  onClick={() => setShowOtherInput(true)}
                  className="w-full py-5 px-8 lg:py-8 bg-primary text-white flex flex-col items-center rounded-lg gap-2"
                >
                  <img
                    src={`/images/icons/others.png`}
                    alt="Other"
                    className="max-h-8 lg:max-h-12"
                  />
                  <span className="text-xs lg:text-lg font-bold uppercase">
                    Other
                  </span>
                </button>
              ) : (
                <div className="flex flex-col w-full gap-3 col-span-2">
                  <InputFieldText
                    inputType="text"
                    placeholder="Please enter your role"
                    value={userType}
                    dispatch={() => {}}
                    changeValue={({ value }) => setUserType(value)}
                    type="userType"
                    dropdown=""
                    setDropdown={() => {}}
                    required={!userType}
                    id="userType"
                    validation={false}
                    readOnly={false}
                    edit
                    changeEdit={() => {}}
                  />
                  <button
                    disabled={!userType}
                    onClick={() => submitSendEstimate(userType)}
                    className="w-full py-5 px-8 lg:py-8 bg-primary text-white flex flex-col items-center rounded-lg gap-2 disabled:opacity-50"
                  >
                    <span className="text-xs lg:text-lg font-bold uppercase">
                      Submit
                    </span>
                  </button>
                </div>
              )}

              {loading === "sendEstimate" && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-xs rounded-xl flex items-center justify-center">
                  <BiLoaderCircle className="text-white text-4xl animate-spin" />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmailType;
