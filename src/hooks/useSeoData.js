import { useState, useEffect } from "react";
import seoMetadata from "../data/seoMetadata.json";

export const useSeoData = (pageType, identifier) => {
  const [seoData, setSeoData] = useState({ title: "", description: "" });

  useEffect(() => {
    const getSeoData = () => {
      const pageData = seoMetadata[pageType];
      if (pageData) {
        if (identifier && pageData[identifier]) {
          return pageData[identifier];
        }
        if (pageData.default) {
          return pageData.default;
        }
      }
      return seoMetadata.default;
    };

    setSeoData(getSeoData());
  }, [pageType, identifier]);

  return seoData;
};
