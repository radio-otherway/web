import React from "react";
import { ISocialButtonProps } from "./socialButtonProps";
import { IoLogoGoogle } from "react-icons/io";
import BaseSocialButton from "@/components/widgets/buttons/social/BaseSocialButton";

const GoogleButton = ({ onClick }: ISocialButtonProps) => {
  return (
    <BaseSocialButton onClick={onClick}>
      <IoLogoGoogle className="mr-2" />
      Google
    </BaseSocialButton>
  );
};

export default GoogleButton;
