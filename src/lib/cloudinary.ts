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
