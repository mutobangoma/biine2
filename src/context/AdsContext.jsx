import React, { createContext, useContext } from "react";
import { useAds } from "../hooks/useAds";

const AdsContext = createContext();

export const AdsProvider = ({ children }) => {
  const { ads, loading, refreshAds } = useAds();

  return (
    <AdsContext.Provider value={{ ads, loading, refreshAds }}>
      {children}
    </AdsContext.Provider>
  );
};

export const useAdsContext = () => useContext(AdsContext);
