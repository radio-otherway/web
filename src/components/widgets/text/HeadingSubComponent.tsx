import React from "react";

export interface IHeadingSubComponentProps {
  title: string;
  subHeading: string;
}
const HeadingSubComponent = ({
  title,
  subHeading,
}: IHeadingSubComponentProps) => {
  return (
    <div className="flex flex-col ml-3">
      <span className="text-lg font-medium leading-6">{title}</span>
      <span className="mt-1 text-xs">{subHeading}</span>
    </div>
  );
};

export default HeadingSubComponent;
