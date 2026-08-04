// utils/pagination.js

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

/**
 * Normalizes page/limit query params according to API-STANDARDS.md
 * Default limit: 20, Maximum limit: 100
 */
export const getPaginationParams = (query) => {
  let page = parseInt(query.page, 10);
  let limit = parseInt(query.limit, 10);

  if (!Number.isInteger(page) || page < 1) page = 1;
  if (!Number.isInteger(limit) || limit < 1) limit = DEFAULT_LIMIT;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

/**
 * Builds the standard paginated response payload.
 */
export const buildPaginatedResult = ({ items, total, page, limit }) => ({
  items,
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit) || 1,
});

export default { getPaginationParams, buildPaginatedResult };
