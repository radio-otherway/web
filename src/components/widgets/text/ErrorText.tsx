import * as React from "react";

export interface IHeadingSubComponentProps extends React.PropsWithChildren {
  styleClass?: string;
}
const HeadingSubComponent = ({
  styleClass,
  children,
}: IHeadingSubComponentProps) => {
  return <p className={`text-center  text-error ${styleClass}`}>{children}</p>;
};
export default HeadingSubComponent;
