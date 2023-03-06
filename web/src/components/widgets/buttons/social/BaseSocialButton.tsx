import React from "react";
import { IoLogoFacebook } from "react-icons/io";

interface IBaseSocialButtonProps extends React.PropsWithChildren {
  onClick: ($event: any) => {};
}

const BaseSocialButton = ({ onClick, children }: IBaseSocialButtonProps) => {
  return <button className="btn" onClick={onClick}>
    {children}
  </button>;

};

export default BaseSocialButton;
