import React from "react";
import clsx from "clsx";

interface IContainerProps extends React.PropsWithChildren {
  className?: string;
}
export function Container({ className, children }: IContainerProps) {
  return (
    <div className={clsx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
