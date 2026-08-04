// utils/slugGenerator.js

import crypto from "crypto";

/**
 * Generates a URL-safe slug from a title, with a short random
 * suffix to avoid collisions without a DB round trip on every call.
 */
const generateSlug = (title) => {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const suffix = crypto.randomBytes(3).toString("hex");
  return `${base}-${suffix}`;
};

export default generateSlug;
