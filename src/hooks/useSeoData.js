import { useState, useEffect } from "react";
import seoMetadata from "../data/seoMetadata.json";

export const useSeoData = (pageType, identifier) => {
  const [seoData, setSeoData] = useState({ title: "", description: "" });

  useEffect(() => {
    const getSeoData = () => {
      const pageData = seoMetadata[pageType];
      if (pageData) {
        // Case 1: Specific identifier match (e.g., a specific category)
        if (identifier && pageData[identifier]) {
          return pageData[identifier];
        }
        // Case 2: The page type has a default (e.g., categories.default)
        if (pageData.default) {
          return pageData.default;
        }
        // Case 3: The page type itself is the data (e.g., home)
        if (pageData.title) {
          return pageData;
        }
      }
      // Fallback to the global default
      return seoMetadata.default;
    };

    setSeoData(getSeoData());
  }, [pageType, identifier]);

  return seoData;
};
