"use client";
import { useEffect, useRef, useState } from "react";

const InputFieldText = ({
  inputType,
  label,
  value,
  dispatch,
  changeValue,
  changeObjectValue,
  idx,
  index,
  items,
  type,
  labelShow,
  labelClassOne,
  inputClassOne,
  inputClassTwo,
  inputClassThree,
  labelClassTwo,
  id,
  dropdown,
  setDropdown,
  validation,
  validationMethod,
  required,
  readOnly,
  edit,
  changeEdit,
  placeholder,
  className,
}) => {
  const inputRef = useRef(null);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value); // Update hasValue when value changes
  }, [value]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setHasValue(!!inputValue); // Update state based on value
    dispatch(
      changeObjectValue
        ? changeObjectValue({ idx, value: inputValue, index, items, type })
        : changeValue({ value: inputValue, type: type })
    );
    setDropdown(dropdown);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        id={id}
        type={inputType}
        className={
          className
            ? className
            : "w-full bg-white px-5 py-3 text-black outline-none border-black border rounded-lg focus:ring-2 ring-primary focus:border-transparent"
        }
        placeholder={placeholder ? placeholder : ""}
        value={value}
        readOnly={readOnly ? true : false}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputFieldText;
