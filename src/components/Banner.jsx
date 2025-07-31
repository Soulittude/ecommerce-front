import React from "react";

const Banner = ({ imageUrl, altText, className, link }) => {
  const content = (
    <img src={imageUrl} alt={altText} className="w-full h-full object-cover" />
  );

  if (link) {
    return (
      <a href={link} className={`flex-1 ${className}`}>
        {content}
      </a>
    );
  }

  return <div className={`flex-1 ${className}`}>{content}</div>;
};

export default Banner;
