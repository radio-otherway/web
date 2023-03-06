import { ChangeEventHandler } from "react";

export default interface ITextInputProps {
  id: string;
  type: string;
  placeholder?: string;
  showLabel?: boolean;

  label: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
