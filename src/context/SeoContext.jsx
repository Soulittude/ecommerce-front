import React, { createContext, useState, useContext } from "react";

const SeoContext = createContext();

export const SeoProvider = ({ children }) => {
  const [seo, setSeo] = useState({
    title: "Your Premier E-Commerce Destination",
    description:
      "Discover a wide range of products, from electronics to fashion. We have everything you need at unbeatable prices. Shop now and enjoy fast shipping and excellent customer service.",
  });

  return (
    <SeoContext.Provider value={{ seo, setSeo }}>
      {children}
    </SeoContext.Provider>
  );
};

export const useSeo = () => {
  const context = useContext(SeoContext);
  if (context === undefined) {
    throw new Error("useSeo must be used within a SeoProvider");
  }
  return context;
};
