import React, { createContext, useContext, useState, useEffect } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [coords, setCoords] = useState(null); // { lat, lng }
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);

  // Automatically request location on mount
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        setCoords({ lat: latitude, lng: longitude });

        // OPTIONAL: Reverse geocode (API later)
        // setCity(await fetchCity(latitude, longitude));

        setLoading(false);
      },
      () => {
        // User denied permission or error
        setLoading(false);
      }
    );
  }, []);

  return (
    <LocationContext.Provider
      value={{
        coords,
        city,
        loading,
        setCity,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
