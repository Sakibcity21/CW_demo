import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const BrandText: React.FC<Props> = ({ children, className }) => {
  return (
    <span className={["brand-tektur", className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
};

export default BrandText;
