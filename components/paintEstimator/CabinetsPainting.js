'use client';

import { cabinetImages } from "@/app/constants";
import { validateNumber } from "@/helpers/forms";
import InputFieldSecondary from "../form/InputFieldSecondary";


const CabinetsPainting = ({
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
  setRequired
}) => {

  return (
    <>
      <div className="pt-3 text-center">
        <h2 className="text-[26px] font-bold text-[#333]">
          How many cabinets are you painting?
        </h2>
        <p
          className={`mt-4 xl:mt-1 text-neutral-600 text-center xl:text-[13px]`}
        >
          Count every door and drawer, big and small, even if they open or they don&rsquo;t. Make sure you count every cabinet including in the kitchen, bathrooms, hallways, outside, garage and anywhere in between.
        </p>
      </div>
      <div
        className="flex flex-col max-lg:items-center lg:flex-row w-full xl:px-10 gap-4"
      >
        <InputFieldSecondary
          inputType={'text'}
          placeholder={`Enter a #`}
          value={estimator.value.doorsAndDrawers}
          dispatch={dispatch}
          changeValue={changeEstimatorValue}
          type={'doorsAndDrawers'}
          inputClassOne={`${requiredFields.includes('doorsAndDrawers') ? ' border-color-1 ' : ' '}`}
          dropdown={''}
          setDropdown={setDropdown}
          required={requiredFields.includes('doorsAndDrawers')}
          id={'doorsAndDrawers'}
          validation={true}
          validationMethod={validateNumber}
        />
        <button
          onClick={() => {
            paintEstimateFieldsRequired(+navigation.value.paintEstimator, estimator.value, dispatch, changePaintEstimator, changeEstimatorValue, paintEstimateSteps, setRequired, changePopup, previewEstimate, trackFormEvents, navigation, changeEdit, false)
          }}
          className="qsnre_btn"
        >
          Next
        </button>
      </div>
      {/* <div className="grid grid-cols-4 gap-3 lg:gap-5 w-full"> */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-[1px] place-items-center w-full">
        {cabinetImages.map((img, index) => (
          <div key={index}>
            <img
              src={img.src}
              alt={img.alt}
              className="max-w-20 lg:max-w-24 rounded-xl"
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default CabinetsPainting
