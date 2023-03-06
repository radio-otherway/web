import React from "react";

interface IErrorTextProps extends React.PropsWithChildren {
  styleClass: string;
}
const ErrorText = ({ styleClass, children }: IErrorTextProps) => {
  return <p className={`text-center  text-error ${styleClass}`}>{children}</p>;
};

export default ErrorText;
