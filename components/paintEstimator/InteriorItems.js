'use client';

import { interiorItemsToBePainted } from "@/app/constants";

const InteriorItems = ({
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
}) => {
  return (
    <>
      <div className="pt-3 text-center">
        <h2 className="text-[26px] font-bold text-[#333]">
          What are you painting?
        </h2>
        <p className={`mt-4 text-neutral-600 text-center`}>
          Select all items you are painting
        </p>
      </div>
      <div className="rounded-2xl border border-[#E5E7EB] w-full overflow-hidden divide-y divide-[#E5E7EB]">
        {interiorItemsToBePainted.map((item, idx) => (
          <label key={idx} className={`flex items-center w-full gap-3 p-3`}>
            <input
              type="checkbox"
              name="interiorItems"
              value={item.title}
              checked={estimator.value.interiorItems?.includes(item)}
              onChange={(e) => {
                const checked = e.target.checked;
                const updatedItems = checked
                  ? [...(estimator.value.interiorItems || []), item]
                  : estimator.value.interiorItems.filter((i) => i !== item);

                dispatch(
                  changeEstimatorValue({
                    value: updatedItems,
                    type: "interiorItems",
                  })
                );
              }}
              className="size-5 rounded-[7px] border-[#868C8F] text-blue-600 focus:ring-blue-500"
            />
            <span className="text-[#1F2937] text-[15px]">{item.title}</span>
          </label>
        ))}
        {Array.isArray(requiredFields) &&
          requiredFields.includes("interiorItems") && (
            <div className="flex items-center px-2 py-[2px] w-max mx-5 gap-x-3 border-[1px] border-red-300 rounded-lg mt-3">
              <span className="text-red-500 text-[12px]">
                Please select at least one
              </span>
            </div>
          )}
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
          next
        </button>
      </div>
    </>
  );
};

export default InteriorItems;
