import React, { forwardRef } from "react";
import ITextInputProps from "./props";

const InputText = forwardRef<HTMLInputElement, ITextInputProps>(
  (
    { id, type, placeholder, label, showLabel = true, onChange, onBlur },
    ref
  ) => {
    return (
      <React.Fragment>
        {showLabel && (
          <label className="label" htmlFor={id}>
            <span className="label-text">{label}</span>
          </label>
        )}
        <input
          id={id}
          className="w-full input-bordered input"
          type={type || "text"}
          placeholder={placeholder || ""}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        />
      </React.Fragment>
    );
  }
);
InputText.displayName = "InputTextAreaComponent";
export default InputText;
