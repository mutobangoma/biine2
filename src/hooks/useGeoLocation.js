import { useState, useEffect } from "react";

export default function useGeoLocation(apiKey) {
  const [location, setLocation] = useState({ city: null, loading: true, error: null });

  useEffect(() => {
    const cached = sessionStorage.getItem("biine_location");
    if (cached) {
      setLocation({ ...JSON.parse(cached), loading: false });
      return;
    }

    if (!navigator.geolocation) {
      setLocation({ city: "Zambia", loading: false });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          if (!apiKey) {
            setLocation({ city: "Zambia", loading: false });
            return;
          }
          const resp = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
          );
          const json = await resp.json();
          const locality = json.results?.[0]?.address_components?.find((c) =>
            c.types.includes("locality")
          )?.long_name;
          const adminArea = json.results?.[0]?.address_components?.find((c) =>
            c.types.includes("administrative_area_level_1")
          )?.long_name;
          const city = locality || adminArea || "Zambia";
          const obj = { city, latitude, longitude };
          sessionStorage.setItem("biine_location", JSON.stringify(obj));
          setLocation({ ...obj, loading: false });
        } catch (err) {
          setLocation({ city: "Zambia", loading: false, error: err.message });
        }
      },
      (err) => {
        setLocation({ city: "Zambia", loading: false, error: err.message });
      },
      { timeout: 7000 }
    );
  }, [apiKey]);

  return location;
}
