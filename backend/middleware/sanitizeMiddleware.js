const DANGEROUS_KEYS = new Set([
  "__proto__",
  "prototype",
  "constructor",
]);

const MONGO_OPERATOR_KEY = /^\$/;

const SCRIPT_TAG =
  /<script[\s\S]*?>[\s\S]*?<\/script>/gi;

const INLINE_EVENT_HANDLER =
  /\son\w+\s*=\s*"[^"]*"/gi;

const JAVASCRIPT_SCHEME =
  /javascript:/gi;

const sanitizeString = (value) =>
  String(value)
    .trim()
    .replace(SCRIPT_TAG, "")
    .replace(INLINE_EVENT_HANDLER, "")
    .replace(JAVASCRIPT_SCHEME, "");

const sanitizeValue = (value) => {
  if (typeof value === "string") {
    return sanitizeString(value);
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (
    value &&
    typeof value === "object"
  ) {
    return sanitizeObject(value);
  }

  return value;
};

const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  const clean = {};

  for (const [key, value] of Object.entries(
    obj
  )) {
    if (
      DANGEROUS_KEYS.has(key) ||
      MONGO_OPERATOR_KEY.test(key)
    ) {
      continue;
    }

    clean[key] = sanitizeValue(value);
  }

  return clean;
};

export const sanitizeRequest = (
  req,
  _res,
  next
) => {
  if (
    req.body &&
    typeof req.body === "object"
  ) {
    req.body = sanitizeObject(req.body);
  }

  /**
   * Express 5
   *
   * req.query is readonly.
   *
   * Never overwrite it.
   */

  if (
    req.params &&
    typeof req.params === "object"
  ) {
    req.params = sanitizeObject(req.params);
  }

  next();
};