'use client';

import { individualItem } from "@/app/constants";
import { validateNumber } from "@/helpers/forms";
import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import InputFieldSecondary from "../form/InputFieldSecondary";

const ExteriorIndividualItems = ({
  estimator,
  dispatch,
  changeEstimatorValue,
  dropdown,
  setDropdown,
  loading,
  setLoading,
  setCookie,
  warning,
  setWarning,
  navigation,
  changePaintEstimator,
  changePopup,
  previewEstimate,
  trackFormEvents,
  changeEdit,
  paintEstimateSteps,
  paintEstimateFieldsRequired,
  requiredFields,
  setRequired,
  changeObjectValue,
  addObjectToArray,
}) => {
  useEffect(() => {
    if (
      !estimator.value.exteriorIndividualItems ||
      estimator.value.exteriorIndividualItems.length === 0
    ) {
      dispatch(
        changeEstimatorValue({
          value: [{ title: "", price: "" }],
          type: "exteriorIndividualItems",
        })
      );
    }
  }, []);

  return (
    <>
      <div className="pt-3 text-center">
        <h2 className="text-[26px] font-bold text-[#333]">
          If your a painter you can add extra items you&rsquo;re painting on the{" "}
          <strong>outside of the home.</strong>
        </h2>
      </div>
      <div className="flex flex-col gap-6 w-full">
        {estimator.value.exteriorIndividualItems?.map((item, idx) => (
          <div key={idx} className="flex max-lg:flex-col gap-5 relative">
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-base font-medium text-[#1F2937]">
                Item {idx + 1}
              </label>
              <InputFieldSecondary
                inputType={"text"}
                placeholder={`ex. doors`}
                value={item.title}
                dispatch={dispatch}
                changeObjectValue={changeObjectValue}
                idx={idx}
                index="title"
                items={estimator.value.exteriorIndividualItems}
                type={"exteriorIndividualItems"}
                inputClassOne={`${requiredFields.includes("exteriorIndividualItems")
                  ? " border-primary "
                  : " "
                  }`}
                dropdown={""}
                setDropdown={setDropdown}
                id={`exteriorIndividualItems${idx}-title`}
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-base font-medium text-[#1F2937]">
                Price {idx + 1}
              </label>
              <InputFieldSecondary
                inputType={"text"}
                placeholder={`$`}
                value={item.price}
                dispatch={dispatch}
                changeObjectValue={changeObjectValue}
                idx={idx}
                index="price"
                items={estimator.value.exteriorIndividualItems}
                type={"exteriorIndividualItems"}
                inputClassOne={`${requiredFields.includes("exteriorIndividualItems")
                  ? " border-primary "
                  : " "
                  }`}
                dropdown={""}
                setDropdown={setDropdown}
                id={`exteriorIndividualItems${idx}-price`}
                validation={true}
                validationMethod={validateNumber}
              />
            </div>
            <div
              className="absolute right-0 top-0 text-white bg-black rounded-full p-0.5"
              onClick={() =>
                dispatch(
                  addObjectToArray({
                    newObject: null,
                    items: estimator.value.exteriorIndividualItems,
                    type: "exteriorIndividualItems",
                    index: idx,
                  })
                )
              }
            >
              <IoCloseOutline />
            </div>
          </div>
        ))}
      </div>
      {Array.isArray(requiredFields) &&
        requiredFields.includes("exteriorIndividualItems") && (
          <div className="flex items-center px-2 py-[2px] w-max mx-5 gap-x-3 border-[1px] border-red-300 rounded-lg mt-3">
            <span className="text-red-500 text-[12px]">Please select one</span>
          </div>
        )}
      <div>
        <button
          onClick={() =>
            dispatch(
              addObjectToArray({
                newObject: individualItem[0],
                items: estimator.value.exteriorIndividualItems,
                type: "exteriorIndividualItems",
              })
            )
          }
          className="qsnre_btn"
        >
          Add Another Item
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => {
            paintEstimateFieldsRequired(
              +navigation.value.paintEstimator,
              estimator.value,
              dispatch,
              changePaintEstimator,
              changeEstimatorValue,
              paintEstimateSteps,
              setRequired,
              changePopup,
              previewEstimate,
              trackFormEvents,
              navigation,
              changeEdit,
              false
            );
          }}
          className="qsnre_btn"
        >
          Skip
        </button>
        <button
          onClick={() => {
            paintEstimateFieldsRequired(
              +navigation.value.paintEstimator,
              estimator.value,
              dispatch,
              changePaintEstimator,
              changeEstimatorValue,
              paintEstimateSteps,
              setRequired,
              changePopup,
              previewEstimate,
              trackFormEvents,
              navigation,
              changeEdit,
              false
            );
          }}
          className="qsnre_btn"
        >
          Next
        </button>
      </div>
      <div className="text-center w-full my-3"></div>
    </>
  );
};

export default ExteriorIndividualItems;
