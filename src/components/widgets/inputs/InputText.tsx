import React from "react";

interface IInputTextProps {
  id: string;
  labelTitle: string;
  labelStyle?: string;
  type?: string;
  containerStyle?: string;
  value: string;
  placeholder?: string;
  showLabel?: boolean;
  updateFormValue: (value: string) => void;
}
const InputText = ({
  id,
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  value,
  placeholder,
  updateFormValue,
  showLabel = true,
}: IInputTextProps) => {

  const updateInputValue = (val: string) => {
    updateFormValue(val);
  };
  const _getId = () => (type === "text" ? `inp_${id}` : `ta_${id}`);
  const _getInput = () =>
    type === "textarea" ? (
      <textarea
        id={_getId()}
        name={_getId()}
        rows={3}
        className="w-full h-24 textarea-bordered textarea"
        placeholder={placeholder || ""}
        defaultValue={value}
        onChange={(e) => updateInputValue(e.target.value)}
      />
    ) : (
      <input
        id={_getId()}
        className="w-full input-bordered input"
        type={type || "text"}
        placeholder={placeholder || ""}
        value={value}
        onChange={(e) => updateInputValue(e.target.value)}
      />
    );
  return (
    <React.Fragment>
      {showLabel && (
        <label className="label" htmlFor={_getId()}>
          <span className="label-text">{labelTitle}</span>
        </label>
      )}
      {_getInput()}
    </React.Fragment>
  );
};

export default InputText;
