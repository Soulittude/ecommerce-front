import React from "react";

const BannerLine = ({ children, className }) => {
  return <div className={`flex gap-4 py-4 ${className}`}>{children}</div>;
};

export default BannerLine;
