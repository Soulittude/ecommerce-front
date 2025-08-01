import React from "react";
import { Helmet } from "react-helmet-async";

const Seo = ({ title, description, image, url }) => {
  const siteName = "My E-Commerce Store"; // You can make this dynamic later if needed
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullUrl = `https://your-domain.com${url}`; // Replace with your actual domain

  return (
    <>
      <Helmet>
        {/* Standard metadata tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={fullUrl} />

        {/* Open Graph tags for social media */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={fullUrl} />
        {image && <meta property="og:image" content={image} />}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
      </Helmet>
      <div className="my-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </>
  );
};

export default Seo;
