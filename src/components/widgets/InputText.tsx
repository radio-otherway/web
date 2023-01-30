import React from "react";

interface IInputTextProps {
  labelTitle: string;
  labelStyle?: string;
  type: string;
  containerStyle: string;
  defaultValue: string;
  placeholder?: string;
  updateFormValue: (type: string, value: string) => void;
  updateType: string;
}
const InputText = ({
  labelTitle,
  labelStyle = "",
  type,
  containerStyle,
  defaultValue,
  placeholder = "",
  updateFormValue,
  updateType,
}: IInputTextProps) => {
  const [value, setValue] = React.useState(defaultValue);

  const updateInputValue = (val: string) => {
    setValue(val);
    updateFormValue(updateType, val);
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <input
        type={type || "text"}
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => updateInputValue(e.target.value)}
        className="w-full input-bordered input "
      />
    </div>
  );
};

export default InputText;
