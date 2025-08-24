"use client";
import { useMutation, useQuery } from "@apollo/client";
import { useWindowSize } from "@react-hook/window-size";
import { AsYouType, getCountries } from "libphonenumber-js";
import { AnimatePresence, motion } from "motion/react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

//// REDUCERS
import { login } from "../_redux/features/authSlice";
import {
  addObjectToArray,
  changeEstimatorValue,
  changeObjectValue,
} from "../_redux/features/estimatorSlice";
import {
  changeEdit,
  changePaintEstimator,
  changePopup,
  changePopupType,
} from "../_redux/features/navigationSlice";
import { changeUserValue, resetUser } from "../_redux/features/userSlice";

//// COMPONENTS
import Navbar from "@/components/layouts/Navbar";
import EmailType from "@/components/modals/emailType";
import GiftCard from "@/components/modals/giftCard";
import SignUp from "@/components/modals/signUp";
import Progress from "@/components/ui/Progress";

///// STEPS
import Preview from "@/components/layouts/preview";
import CabinetConditions from "@/components/paintEstimator/CabinetConditions";
import CabinetDetail from "@/components/paintEstimator/CabinetDetail";
import CabinetPaint from "@/components/paintEstimator/CabinetPaint";
import CabinetsPainting from "@/components/paintEstimator/CabinetsPainting";
import ExteriorCondition from "@/components/paintEstimator/ExteriorCondition";
import ExteriorDetail from "@/components/paintEstimator/ExteriorDetail";
import ExteriorIndividualItems from "@/components/paintEstimator/ExteriorIndividualItems";
import ExteriorItems from "@/components/paintEstimator/ExteriorItems";
import ExteriorPaint from "@/components/paintEstimator/ExteriorPaint";
import ExteriorSquareFeet from "@/components/paintEstimator/ExteriorSquareFeet";
import InsideCabinet from "@/components/paintEstimator/InsideCabinet";
import InteriorCondition from "@/components/paintEstimator/InteriorCondition";
import InteriorDetail from "@/components/paintEstimator/InteriorDetail";
import InteriorIndividualItems from "@/components/paintEstimator/InteriorIndividualItems";
import InteriorItems from "@/components/paintEstimator/InteriorItems";
import InteriorPaint from "@/components/paintEstimator/InteriorPaint";
import InteriorSquareFeet from "@/components/paintEstimator/InteriorSquareFeet";
import PaintBrand from "@/components/paintEstimator/PaintBrand";
import PropertyAddress from "@/components/paintEstimator/PropertyAddress";

///// LIBS
import { useAnalyticsEvent } from "@/helpers/analytics";
import { paintEstimateFieldsRequired } from "@/helpers/main_forms";
import { paintEstimateSteps } from "../constants";

//// MUTATIONS
import GET_CALCULATIONS from "../_mutations/getCalculations";

///// QUERIES
import GET_USER from "../_queries/fetchUser";

import Confirmation from "@/components/modals/Confirmation";
import GiftPopup from "@/components/modals/GiftPopup";
import { validateEmail, validateNumber, validatePrice } from "@/helpers/forms";
import { FaArrowLeft } from "react-icons/fa";
import StepSync from "./StepSync";

const allCountries = getCountries();

const PaintEstimator = ({ }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const businessEmailRef = useRef();
  const termsRef = useRef(null);
  const previewRef = useRef(null);
  const { event } = useAnalyticsEvent();
  const [width, height] = useWindowSize();
  const [windowWidth, setWindowWidth] = useState("");
  const [dropdown, setDropdown] = useState("");
  const [country, setCountry] = useState("US");
  const [countries, setCountries] = useState(allCountries);
  const [view, setView] = useState("");
  const [popup, setPopup] = useState("");
  const [popupType, setPopupType] = useState("");
  const [edit, setEdit] = useState("");
  const [requiredFields, setRequired] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [warning, setWarning] = useState("");
  const [showBottomButtons, setShowBottomButtons] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "user",
    "view",
    "address",
  ]);
  const navigation = useSelector((state) => state.navigationReducer);
  const estimator = useSelector((state) => state.estimatorReducer);
  const user = useSelector((state) => state.userReducer.value);

  //// MUTATIONS
  const [
    getCalculations,
    { dataGetCalculations, loadingGetCalculations, errorGetCalculations },
  ] = useMutation(GET_CALCULATIONS);

  //// QUERIES
  const dataUser = useQuery(GET_USER, {
    variables: {
      id: cookies.user ? cookies.user.id : "unknown",
      token: cookies.token ? cookies.token : "unknown",
    },
  });

  useEffect(() => {
    if (dataUser.error) {
      console.log("ERROR", dataUser.error);
    }

    if (dataUser.data && dataUser.data.user) {
      dispatch(
        changeUserValue({
          value: cookies.pending_businessLogo
            ? cookies.pending_businessLogo
            : dataUser.data.user.businessLogo,
          type: "businessLogo",
        })
      );
      dispatch(
        changeEstimatorValue({
          value: cookies.pending_businessLogo
            ? cookies.pending_businessLogo
            : dataUser.data.user.businessLogo,
          type: "businessLogo",
        })
      );
      dispatch(
        changeEstimatorValue({
          value: dataUser.data.user.businessName,
          type: "businessName",
        })
      );
      dispatch(
        changeEstimatorValue({
          value: dataUser.data.user.estimatorName,
          type: "estimatorName",
        })
      );
      dispatch(
        changeEstimatorValue({
          value: dataUser.data.user.businessAddress,
          type: "businessAddress",
        })
      );
      dispatch(
        changeEstimatorValue({
          value: dataUser.data.user.businessLicenseNumber,
          type: "businessLicenseNumber",
        })
      );
      dispatch(
        changeEstimatorValue({
          value: dataUser.data.user.businessEmail,
          type: "businessEmail",
        })
      );
      dispatch(
        changeEstimatorValue({
          value: dataUser.data.user.businessPhone,
          type: "businessPhone",
        })
      );
    }
  }, [dataUser]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    setWindowWidth(width);
  }, [width]);

  useEffect(() => {
    if (country && estimator.value.businessPhone.length > 0) {
      const asYouType = new AsYouType(country);
      asYouType.input(estimator.value.businessPhone);

      if (asYouType.getNumber()) {
        let number = asYouType.getNumber().nationalNumber; // Use national number only

        // Extract digits only
        number = number.replace(/\D/g, "");

        // Format the number to (XXX) XXX-XXXX
        const formattedNumber = number.replace(
          /^(\d{3})(\d{3})(\d{4})$/,
          "($1) $2-$3"
        );

        dispatch(
          changeEstimatorValue({
            value: formattedNumber,
            type: "businessPhone",
          })
        );
      }
    }
  }, [estimator.value.businessPhone]);

  useEffect(() => {
    if (country && estimator.value.clientPhone.length > 0) {
      const asYouType = new AsYouType(country);
      asYouType.input(estimator.value.clientPhone);

      if (asYouType.getNumber()) {
        let number = asYouType.getNumber().nationalNumber; // Use national number only

        // Extract digits only
        number = number.replace(/\D/g, "");

        // Format the number to (XXX) XXX-XXXX
        const formattedNumber = number.replace(
          /^(\d{3})(\d{3})(\d{4})$/,
          "($1) $2-$3"
        );

        dispatch(
          changeEstimatorValue({ value: formattedNumber, type: "clientPhone" })
        );
      }
    }
  }, [estimator.value.clientPhone]);

  useEffect(() => {
    setView(navigation.value.view);
    setPopup(navigation.value.popup);
    setPopupType(navigation.value.popupType);
    setEdit(navigation.value.edit);
  }, [navigation]);

  useEffect(() => {
    setRequired("");
  }, [estimator.value]);

  const previewEstimate = async () => {
    setLoading("getCalculations");

    try {
      const response = await getCalculations({
        variables: {
          estimate: {
            businessName: estimator.value.businessName,
            estimatorName: estimator.value.estimatorName,
            businessAddress: estimator.value.businessAddress,
            businessPhone: estimator.value.businessPhone,
            businessEmail: estimator.value.businessEmail,
            businessWebsite: estimator.value.businessWebsite,
            businessLicenseNumber: estimator.value.businessLicenseNumber,
            businessInstagram: estimator.value.businessInstagram,
            clientName: estimator.value.clientName,
            clientPhone: estimator.value.clientPhone,
            clientPropertyAddress: estimator.value.clientPropertyAddress,
            clientEmail: estimator.value.clientEmail,
            clientZipCode: estimator.value.clientZipCode,
            interiorSquareFeet: estimator.value.interiorSquareFeet,
            interiorCondition: estimator.value.interiorCondition,
            interiorDetail: estimator.value.interiorDetail,
            interiorItems: estimator.value.interiorItems,
            interiorIndividualItems: estimator.value.interiorIndividualItems,
            doorsAndDrawers: estimator.value.doorsAndDrawers,
            insideCabinet:
              estimator.value.insideCabinet == "yes" ? true : false,
            cabinetCondition: estimator.value.cabinetCondition,
            cabinetDetail: estimator.value.cabinetDetail,
            exteriorSquareFeet: estimator.value.exteriorSquareFeet,
            exteriorCondition: estimator.value.exteriorCondition,
            exteriorDetail: estimator.value.exteriorDetail,
            exteriorItems: estimator.value.exteriorItems,
            exteriorIndividualItems: estimator.value.exteriorIndividualItems,
            painters: estimator.value.painters,
            hoursPerDay: estimator.value.hoursPerDay,
            days: estimator.value.days,
            paintBrand: estimator.value.paintBrand,
            paintQuality: estimator.value.paintQuality,
            warranty: estimator.value.warranty,
            payments: estimator.value.payments,
            deposit: estimator.value.deposit,
            depositType: estimator.value.depositType,
            painterTapeRolls: estimator.value.painterTapeRolls,
            plasticRolls: estimator.value.plasticRolls,
            dropCloths: estimator.value.dropCloths,
          },
        },
      });

      if (response.data.getCalculations.estimate) {
        Object.keys(response.data.getCalculations.estimate).forEach((key) => {
          if (response.data.getCalculations.estimate[key]) {
            dispatch(
              changeEstimatorValue({
                value: response.data.getCalculations.estimate[key],
                type: key,
              })
            );
          }
        });
      }

      setLoading("");
      dispatch(changePaintEstimator(5));
    } catch (error) {
      console.log(error);
      setLoading("");
      if (error) setMessage(error.message);
    }
  };

  useEffect(() => {
    if (cookies.user && cookies.token) {
      dispatch(changeUserValue({ value: cookies.user.id, type: "id" }));
      dispatch(login());
    }
  }, [cookies]);

  const handlePlaceSelection = async (placeId) => {
    try {
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );

      service.getDetails({ placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const zipCodeComponent = place.address_components.find((component) =>
            component.types.includes("postal_code")
          );

          // Remove Country from Address
          let formattedAddress = place.formatted_address; // Full address
          let addressParts = formattedAddress.split(","); // Split by comma

          if (addressParts.length > 1) {
            addressParts.pop(); // Remove the last part (Country)
          }

          const updatedAddress = addressParts.join(", "); // Reassemble without the country

          // Update Estimator
          dispatch(
            changeEstimatorValue({
              value: updatedAddress,
              type: "clientPropertyAddress",
            })
          );
          dispatch(
            changeEstimatorValue({
              value: zipCodeComponent.long_name,
              type: "clientZipCode",
            })
          );
        }
      });
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  useEffect(() => {
    if (+navigation.value.paintEstimator == 1) {
      localStorage.removeItem("signupDismissed");
      localStorage.removeItem("giftCardDismissed");
    }

    const signupDismissed = localStorage.getItem("signupDismissed");

    if (
      !signupDismissed &&
      popup === "" &&
      +navigation.value.paintEstimator === 5
    ) {
      const timer = setTimeout(() => {
        dispatch(changePopup("signup"));
      }, 5000);

      return () => clearTimeout(timer);
    }

    const giftCardDismissed = localStorage.getItem("giftCardDismissed");

    if (
      signupDismissed &&
      !giftCardDismissed &&
      popup === "" &&
      +navigation.value.paintEstimator === 5
    ) {
      const timer = setTimeout(() => {
        dispatch(changePopup("giftCard"));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [popup, navigation.value.paintEstimator]);

  const trackFormEvents = (action, label, value) => {
    event({
      action: action,
      category: "estimate",
      label: label,
      value: value,
    });
  };

  useEffect(() => {
    if (cookies.address) {
      try {
        if (cookies.address.formattedAddress && cookies.address.zipCode) {
          dispatch(
            changeEstimatorValue({
              value: cookies.address.formattedAddress,
              type: "clientPropertyAddress",
            })
          );
          dispatch(
            changeEstimatorValue({
              value: cookies.address.zipCode,
              type: "clientZipCode",
            })
          );
          removeCookie("address");
        }
      } catch (err) {
        console.error("Invalid address cookie format", err);
      }
    }
  }, [cookies]);

  useEffect(() => {
    if (+navigation.value.paintEstimator == 4) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setShowBottomButtons(entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0.1,
        }
      );

      const current = termsRef.current;
      if (current) observer.observe(current);

      return () => {
        if (current) observer.unobserve(current);
      };
    }
  }, [navigation.value.paintEstimator]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (+navigation.value.paintEstimator == 5) {
      setShowBottomButtons(true);
    }
  }, [+navigation.value.paintEstimator]);

  useEffect(() => {
    // console.log("NODE", process.env.NODE_ENV);
    // console.log("GRAPHQL", process.env.NEXT_PUBLIC_GRAPHQL_PRODUCTION_ENDPOINT);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [lastModal, setLastModal] = useState("");
  const [blurPage, setBlurPage] = useState(false);

  const orderedSteps = [
    "1",
    "2",
    "2.1",
    "2.2",
    "2.3",
    "2.4",
    "2.5",
    "3",
    "3.1",
    "3.2",
    "3.3",
    "3.4",
    "4",
    "4.1",
    "4.2",
    "4.3",
    "4.4",
    "4.5",
    "4.6",
    "5",
  ];

  const goBack = () => {
    const current = String(navigation.value.paintEstimator);
    const idx = orderedSteps.indexOf(current);
    if (idx <= 0) return;
    const prev = orderedSteps[idx - 1];
    dispatch(changePaintEstimator(prev));
    const url = new URL(window.location.href);
    url.searchParams.set("step", prev);
    window.history.replaceState({}, "", url.toString());
  };

  useEffect(() => {
    if (popup === "") {
      setBlurPage(lastModal === "emailType");
    } else {
      setBlurPage(false);
      setLastModal(popup);
    }
  }, [popup, lastModal]);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <head>
        <title>Free Paint Estimate Cost Calculator - Middler</title>

        <meta property="og:site_name" content="Middler" />

        <meta name="robots" content="index, follow" />

        <meta name="description"
              content="Free paint cost calculator to estimate interior & exterior house painting costs per square foot instantly." />

        <meta property="og:title" content="Free Paint Estimate Cost Calculator - Middler" />

        <meta property="og:type" content="website" />

        <meta property="og:url" content="https://middler.com/paint-estimator" />

        <meta property="og:image" content="https://middler.com/images/modals/3.png" />

        <meta property="og:description"
              content="Free paint cost calculator to estimate interior & exterior house painting costs per square foot instantly." />

        <meta name="twitter:card" content="summary" />

        <meta name="twitter:url" content="https://middler.com/" />

        <meta name="twitter:title" content="Free Paint Estimate Cost Calculator - Middler" />

        <meta name="twitter:description"
              content="Free paint cost calculator to estimate interior & exterior house painting costs per square foot instantly." />

        <meta name="twitter:image" content="https://middler.com/images/modals/3.png" />

        <link rel="canonical" href="https://middler.com/paint-estimator" />
      </head>
      <main
        className={`min-h-dvh h-full overflow-hidden w-full p-5 lg:p-3 xl:p-6 xl:py-5 bg-cover bg-no-repeat bg-center bg-[url('/images/modals/bg_1.png')]`}
      >
        <div className="grid size-full min-h-[calc(100dvh_-_40px)] lg:min-h-[calc(100dvh_-_32px)] xl:min-h-[calc(100dvh_-_40px)] lg:grid-rows-1 xl:grid-cols-[0.3fr_1fr_0.3fr] 3xl:grid-cols-[0.23fr_1fr_0.23fr] gap-5 lg:gap-8 3xl:gap-10">
          {navigation.value.paintEstimator != "5" && (
            <>
              <div className="max-lg:hidden mt-[64px] bg-cover bg-center bg-no-repeat bg-[url('/images/modals/1.png')] rounded-2xl" />
              <div
                className={`w-full flex items-center flex-col justify-between gap-5 2xl:gap-4`}
              >
                <Navbar />
                <Progress />

                <div className="lg:hidden">
                  <img src="/images/modals/team.png" alt="" />
                </div>
                <div
                  className={`${navigation.value.paintEstimator == "2.2"
                    ? "px-0"
                    : "lg:px-5"
                    } w-full`}
                >
                  <div className="px-4 lg:px-11 xl:px-2 py-[30px] lg:py-6 flex flex-col items-center justify-center gap-[30px] bg-white shadow-[0_6px_46px] shadow-black/20 rounded-3xl lg:rounded-[31px] relative">
                    {/* <button
                      onClick={goBack}
                      disabled={String(navigation.value.paintEstimator) === orderedSteps[0]}
                      className="absolute top-1.5 left-1.5 lg:top-2 lg:left-2 rounded-full disabled:cursor-not-allowed not-disabled:cursor-pointer bg-neutral-100 border disabled:border-neutral-400 disabled:text-neutral-500 text-black border-neutral-500 p-1.5 max-lg:text-base lg:p-2.5 not-disabled:hover:bg-black not-disabled:hover:text-white transition-all duration-300 ease-in-out not-disabled:hover:shadow-[0_0_20px] shadow-black/30"
                    >
                      <FaArrowLeft />
                    </button> */}
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        className={`lg:px-5 2xl:min-h-[190px] w-full flex flex-col items-center justify-center gap-[30px] lg:gap-4 bg-white shadow[0_6px_46px_rgba(0,0,0,0.2)] rounded-3xl lg:rounded-4xl qsnre`}
                      >
                        {navigation.value.paintEstimator == "1" && (
                          <PropertyAddress
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "2" && (
                          <InteriorPaint
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "2.1" && (
                          <InteriorSquareFeet
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "2.2" && (
                          <InteriorItems
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "2.3" && (
                          <InteriorCondition
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "2.4" && (
                          <InteriorDetail
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "2.5" && (
                          <InteriorIndividualItems
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                            changeObjectValue={changeObjectValue}
                            addObjectToArray={addObjectToArray}
                          />
                        )}
                        {navigation.value.paintEstimator == "3" && (
                          <CabinetPaint
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "3.1" && (
                          <CabinetsPainting
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "3.2" && (
                          <InsideCabinet
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "3.3" && (
                          <CabinetConditions
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "3.4" && (
                          <CabinetDetail
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "4" && (
                          <ExteriorPaint
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "4.1" && (
                          <ExteriorSquareFeet
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "4.2" && (
                          <ExteriorItems
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "4.3" && (
                          <ExteriorCondition
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "4.4" && (
                          <ExteriorDetail
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "4.5" && (
                          <ExteriorIndividualItems
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                            changeObjectValue={changeObjectValue}
                            addObjectToArray={addObjectToArray}
                          />
                        )}
                        {navigation.value.paintEstimator == "4.6" && (
                          <PaintBrand
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div
                  className={`max-lg:hidden w-full h-auto max-h-[220px] 2xl:max-h-[280px] ${navigation.value.paintEstimator == "3.1" ||
                    navigation.value.paintEstimator == "3.2"
                    ? "3xl:max-h-[280px]"
                    : " 3xl:max-h-[310px]"
                    } rounded-2xl`}
                >
                  <img
                    src="/images/modals/3.png"
                    className="w-full object-fill 2xl:object-cover object-top h-full rounded-2xl"
                    alt=""
                  />
                </div>

                <div className="lg:hidden grid w-full grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <img src="/images/modals/wmn_laugh.png" alt="" />
                  </div>
                  <div>
                    <img src="/images/modals/car.png" alt="" />
                  </div>
                  <div>
                    <img src="/images/modals/five_star.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="max-lg:hidden mt-[64px] bg-cover bg-center bg-no-repeat bg-[url('/images/modals/2.png')] rounded-2xl" />
            </>
          )}
          {navigation.value.paintEstimator == "5" && (
            <Preview
              navigation={navigation}
              estimator={estimator.value}
              dispatch={dispatch}
              changeEstimatorValue={changeEstimatorValue}
              changePaintEstimator={changePaintEstimator}
              changeObjectValue={changeObjectValue}
              addObjectToArray={addObjectToArray}
              changeEdit={changeEdit}
              changePopup={changePopup}
              changePopupType={changePopupType}
              dropdown={dropdown}
              setDropdown={setDropdown}
              setCountry={setCountry}
              countries={countries}
              validateNumber={validateNumber}
              validatePrice={validatePrice}
              requiredFields={requiredFields}
              cookies={cookies}
              businessEmailRef={businessEmailRef}
              previewRef={previewRef}
            />
          )}
        </div>
      </main>
      <Suspense fallback={null}>
        <StepSync />
      </Suspense>
      <>
        {popup == "emailType" && (
          <EmailType
            dispatch={dispatch}
            changeUserValue={changeUserValue}
            resetUser={resetUser}
            user={user}
            changePopup={changePopup}
            changePopupType={changePopupType}
            navigation={navigation}
            estimator={estimator}
            validateEmail={validateEmail}
            login={login}
            paintEstimateFieldsRequired={paintEstimateFieldsRequired}
            changePaintEstimator={changePaintEstimator}
            changeEstimatorValue={changeEstimatorValue}
            paintEstimateSteps={paintEstimateSteps}
            setRequired={setRequired}
            previewEstimate={previewEstimate}
            trackFormEvents={trackFormEvents}
            changeEdit={changeEdit}
          />
        )}
        {popup == "signup" && (
          <SignUp
            dispatch={dispatch}
            changeUserValue={changeUserValue}
            resetUser={resetUser}
            user={user}
            changePopup={changePopup}
            changePopupType={changePopupType}
            navigation={navigation}
            estimator={estimator}
            validateEmail={validateEmail}
            login={login}
            paintEstimateFieldsRequired={paintEstimateFieldsRequired}
            changePaintEstimator={changePaintEstimator}
            changeEstimatorValue={changeEstimatorValue}
            paintEstimateSteps={paintEstimateSteps}
            setRequired={setRequired}
            previewEstimate={previewEstimate}
            trackFormEvents={trackFormEvents}
            changeEdit={changeEdit}
            setIsConfirmOpen={setIsConfirmOpen}
          />
        )}

        {isConfirmOpen && (
          <Confirmation
            isConfirmOpen={isConfirmOpen}
            setIsConfirmOpen={setIsConfirmOpen}
          />
        )}
        {popup == "giftCard" && (
          <GiftPopup
            dispatch={dispatch}
            changePopup={changePopup}
            showPopUp={true}
            isMainPage={false}
          />
        )}
      </>
    </>
  );
};

export default PaintEstimator;
