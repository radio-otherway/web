import React from "react";
import Link from "next/link";
import clsx from "clsx";

interface IButtonProps
  extends React.PropsWithChildren,
    React.HTMLProps<HTMLButtonElement> {
  className?: string;
  type?: string;
}

export function Button({
  className = "btn-default",
  type = "button",
  ...props
}: IButtonProps) {
  return <button className={clsx("btn", className)} {...props} />;
}

interface IButtonLinkProps extends IButtonProps {
  href: string;
}
export function ButtonLink({
  href,
  className = "btn-default",
  children,
}: IButtonProps) {
  return (
    <Link href={href as string} className={clsx("btn", className)}>
      {children}
    </Link>
  );
}
