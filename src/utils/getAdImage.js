const DEMO_IMAGES = {
  cars: "https://firebasestorage.googleapis.com/…/demo/cars.jpg",
  property: "https://firebasestorage.googleapis.com/…/demo/property.jpg",
  electronics: "https://firebasestorage.googleapis.com/…/demo/electronics.jpg",
  jobs: "https://firebasestorage.googleapis.com/…/demo/jobs.jpg",
  fashion: "https://firebasestorage.googleapis.com/…/demo/fashion.jpg",
  default: "https://firebasestorage.googleapis.com/…/demo/default.jpg",
};

export function getAdImage(ad) {
  // Real ads with images
  if (ad.images?.length) {
    return ad.images[0];
  }

  // Demo ads fallback
  if (ad.isDemo === true) {
    const key = ad.category?.toLowerCase();
    return DEMO_IMAGES[key] || DEMO_IMAGES.default;
  }

  // Real ads with no images
  return DEMO_IMAGES.default;
}
