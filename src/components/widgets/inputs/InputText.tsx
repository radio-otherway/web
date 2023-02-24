import React from "react";

interface IInputTextProps {
  id: string;
  labelTitle: string;
  labelStyle?: string;
  type?: string;
  containerStyle?: string;
  defaultValue: string;
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
  defaultValue,
  placeholder,
  updateFormValue,
  showLabel = true,
}: IInputTextProps) => {
  const [value, setValue] = React.useState(defaultValue);

  const updateInputValue = (val: string) => {
    setValue(val);
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
        defaultValue={defaultValue}
      />
    ) : (
      <input
        id={_getId()}
        type={type || "text"}
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => updateInputValue(e.target.value)}
        className="w-full input-bordered input"
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
