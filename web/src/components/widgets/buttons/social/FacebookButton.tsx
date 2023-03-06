import React from "react";
import { IoLogoFacebook } from "react-icons/io";
import BaseSocialButton from "@/components/widgets/buttons/social/BaseSocialButton";
import { ISocialButtonProps } from "@/components/widgets/buttons/social/socialButtonProps";

const FacebookButton = ({ onClick }: ISocialButtonProps) => {
  return (
    <BaseSocialButton onClick={onClick}>
      <IoLogoFacebook className="mr-2" />
      Facebook
    </BaseSocialButton>
  );
};

export default FacebookButton;
