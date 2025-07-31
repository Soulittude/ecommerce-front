import React from "react";

const BannerLine = ({ children, className }) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

export default BannerLine;
