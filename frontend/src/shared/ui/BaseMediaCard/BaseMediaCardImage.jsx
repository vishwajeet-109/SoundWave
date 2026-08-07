/**
 * ============================================================
 * BaseMediaCardImage
 * ============================================================
 *
 * Shared media image component.
 *
 * Features
 * --------
 * ✓ Lazy Loading
 * ✓ Image Error Fallback
 * ✓ Hover Zoom
 * ✓ Overlay Slot
 * ✓ Responsive
 * ✓ Accessible
 *
 * Future
 * -------
 * - Progressive Blur
 * - Cloudinary Transformations
 * - Image Prefetch
 * - Dominant Color Extraction
 * ============================================================
 */

import { memo, useState, useCallback } from "react";
import {
  DEFAULT_MEDIA_IMAGE,
  CARD_RADIUS,
  CARD_TRANSITION,
} from "./baseMediaCard.constants";

/**
 * Shared Image Component
 */
const BaseMediaCardImage = memo(
  ({
    src,
    alt,

    size = "md",

    className = "",

    children,

    loading = "lazy",
  }) => {
    const [imageError, setImageError] = useState(false);

    const handleError = useCallback(() => {
      setImageError(true);
    }, []);

    return (
      <div
        className={`
            relative
            overflow-hidden
            ${CARD_RADIUS[size] ?? CARD_RADIUS.md}
            group
        `}
      >
        <img
          src={imageError ? DEFAULT_MEDIA_IMAGE : src}
          alt={alt}
          loading={loading}
          draggable={false}
          onError={handleError}
          className={`
              block
              w-full
              h-full
              object-cover
              select-none
              ${CARD_TRANSITION}
              group-hover:scale-105
              ${className}
          `}
        />

        {children && (
          <div
            className="
                absolute
                inset-0
                flex
                items-center
                justify-center
            "
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);

BaseMediaCardImage.displayName =
  "BaseMediaCardImage";

export default BaseMediaCardImage;