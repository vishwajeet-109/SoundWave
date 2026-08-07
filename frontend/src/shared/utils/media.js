const DEFAULT_MEDIA_IMAGE =
  "https://placehold.co/600x600/171717/ffffff?text=♪";

export function resolveMediaImage(image, fallback = DEFAULT_MEDIA_IMAGE) {
  if (!image) return fallback;

  if (typeof image === "string") return image;

  if (image?.url) return image.url;

  return fallback;
}

export { DEFAULT_MEDIA_IMAGE };
