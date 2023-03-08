import React from "react";
interface ISubtitleProps extends React.PropsWithChildren {
  styleClass: string;
}
const Subtitle = ({ styleClass, children }: ISubtitleProps) => {
  return (
    <div className={`text-xl font-semibold ${styleClass}`}>{children}</div>
  );
};

export default Subtitle;
