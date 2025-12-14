import { useEffect, useRef } from "react";

export default function AdUnit({ adSlot, style, format, layoutKey }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.dataset.loaded) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      ref.current.dataset.loaded = "true";
    } catch (e) {
      console.warn("AdSense skipped:", e.message);
    }
  }, []);

  return (
    <ins
      ref={ref}
      className="adsbygoogle"
      style={style || { display: "block" }}
      data-ad-client="ca-pub-5658209077209925"
      data-ad-slot={adSlot}
      data-ad-format={format}
      data-ad-layout-key={layoutKey}
    />
  );
}
