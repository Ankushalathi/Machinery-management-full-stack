import React, { ReactNode } from "react";

type Props = {
  htmlFor?: string;
  children: ReactNode;
  hidden?: boolean;
};

const ATMFieldLabel = ({ htmlFor, children, hidden = false }: Props) => {
  return (
    <label
      className={`text-sm font-medium tracking-wide text-slate-700  ${
        hidden && "hidden"
      } `}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default ATMFieldLabel;
