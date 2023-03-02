import React, { forwardRef, Ref } from "react";
import ITextInputProps from "./props";


const InputTextArea = forwardRef<HTMLTextAreaElement, ITextInputProps>(
  ({ id, placeholder, showLabel = true, label, onChange, onBlur }, ref) => {
    return (
      <React.Fragment>
        {showLabel && (
          <label className="label" htmlFor={id}>
            <span className="label-text">{label}</span>
          </label>
        )}
        <textarea
          id={id}
          name={id}
          rows={3}
          className="w-full h-24 textarea-bordered textarea"
          placeholder={placeholder || ""}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        />
      </React.Fragment>
    );
  }
);
InputTextArea.displayName = "InputTextComponent";
export default InputTextArea;


