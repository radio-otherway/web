import React from "react";
import Subtitle from "./Subtitle";

interface ITitleCardProps extends React.PropsWithChildren {
  title: string;
  topMargin?: string;
  topSideButtons?: React.ReactNode;
}
const TitleCard = ({
  title,
  children,
  topMargin = "mt-6",
  topSideButtons,
}: ITitleCardProps) => {
  return (
    <div
      className={
        "card w-full bg-base-100 p-6 shadow-xl " + (topMargin || "mt-6")
      }
    >
      {/* Title for Card */}
      <Subtitle styleClass={topSideButtons ? "inline-block" : ""}>
        {title}

        {/* Top side button, show only if present */}
        {topSideButtons && (
          <div className="float-right inline-block">{topSideButtons}</div>
        )}
      </Subtitle>

      <div className="divider mt-2"></div>

      {/** Card Body */}
      <div className="h-full w-full bg-base-100 pb-6">{children}</div>
    </div>
  );
};

export default TitleCard;
