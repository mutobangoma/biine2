import { useEffect, useRef, useState } from "react";

export default function LazyAd({ adSlot }) {
  const adRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Intersection Observer — load ad when scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (adRef.current) observer.observe(adRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && window.adsbygoogle) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, [isVisible]);

  return (
    <div ref={adRef} className="w-full my-4 flex justify-center">
      {isVisible && (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="pub-5658209077209925"
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
          data-adtest="on"
        />
      )}
    </div>
  );
}
