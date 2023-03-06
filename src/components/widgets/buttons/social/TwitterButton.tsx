import React from "react";
import { ISocialButtonProps } from "./socialButtonProps";
import { IoLogoTwitter } from "react-icons/io";
import BaseSocialButton from "@/components/widgets/buttons/social/BaseSocialButton";

const TwitterButton = ({ onClick }: ISocialButtonProps) => {
  return (
    <BaseSocialButton onClick={onClick}>
      <IoLogoTwitter className="mr-2" />
      Twitter
    </BaseSocialButton>
  );
};

export default TwitterButton;
