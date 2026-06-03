/** Open Graph standard — 1.91:1 (Facebook, LinkedIn, X large card). */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/**
 * Cloudinary URL cropped to OG dimensions. Strips prior transforms so
 * desktop screenshots (often ~2:1) fill the card without wrong metadata.
 */
export function cloudinaryOgImageUrl(url: string): string {
  if (!url.includes("res.cloudinary.com")) return url;

  const marker = "/image/upload/";
  const index = url.indexOf(marker);
  if (index === -1) return url;

  const prefix = url.slice(0, index + marker.length);
  const afterUpload = url.slice(index + marker.length);
  const versionMatch = afterUpload.match(/(v\d+\/.+)$/);
  if (!versionMatch) return url;

  const transform = `w_${OG_IMAGE_WIDTH},h_${OG_IMAGE_HEIGHT},c_fill,g_auto,f_auto,q_auto`;
  return `${prefix}${transform}/${versionMatch[1]}`;
}

/**
 * Inject Cloudinary delivery transforms after `/image/upload/`.
 * Local paths (`/work/...`) and non-Cloudinary URLs pass through unchanged.
 *
 * Example:
 *   …/image/upload/v123/folder/shot.png
 *   → …/image/upload/w_1400,f_auto,q_auto/v123/folder/shot.png
 */
export function cloudinaryImageUrl(
  url: string,
  options: {
    width: number;
    quality?: "auto" | number;
    /** Preserve full screenshot — no crop (default for UI captures). */
    crop?: "limit";
  } = { width: 1400, crop: "limit" },
): string {
  if (!url.includes("res.cloudinary.com")) return url;

  const marker = "/image/upload/";
  const index = url.indexOf(marker);
  if (index === -1) return url;

  const afterUpload = url.slice(index + marker.length);
  const firstSegment = afterUpload.split("/")[0] ?? "";
  // Already has transforms (e.g. w_1200,f_auto or c_fill,w_800)
  if (/[_:,]/.test(firstSegment) && !/^v\d+$/i.test(firstSegment)) {
    return url;
  }

  const quality =
    options.quality === undefined || options.quality === "auto"
      ? "q_auto"
      : `q_${options.quality}`;

  const crop = options.crop === "limit" ? "c_limit" : "c_limit";
  const transform = `w_${options.width},${crop},f_auto,${quality}`;

  return `${url.slice(0, index + marker.length)}${transform}/${afterUpload}`;
}

/** Responsive srcset for case-study `<Shot>` figures. */
export function cloudinaryShotSrcSet(url: string): string | undefined {
  if (!url.includes("res.cloudinary.com")) return undefined;
  return [
    `${cloudinaryImageUrl(url, { width: 960 })} 960w`,
    `${cloudinaryImageUrl(url, { width: 1440 })} 1440w`,
    `${cloudinaryImageUrl(url, { width: 1920 })} 1920w`,
  ].join(", ");
}
