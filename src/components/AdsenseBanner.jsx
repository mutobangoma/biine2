export default function AdsenseBanner({ adSlot }) {
  return (
    <div className="w-full flex justify-center items-center overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: "block", maxWidth: "100%", height: "60px" }}
        data-ad-client="ca-pub-5658209077209925"
        data-ad-slot={adSlot}
        data-ad-format="horizontal"
      />
      <script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</script>
    </div>
  );
}
