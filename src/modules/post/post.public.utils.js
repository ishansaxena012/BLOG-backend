export const normalizePublicFeedQuery = (query) => {
  let { page, limit, search } = query;

  // Page
  page = parseInt(page, 10);
  if (isNaN(page) || page < 1) page = 1;

  // Limit
  limit = parseInt(limit, 10);
  if (isNaN(limit) || limit < 1) limit = 10;
  if (limit > 50) limit = 50;

  // Search
  if (typeof search === "string") {
    search = search.trim();
    if (search.length === 0 || search.length > 100) {
      search = undefined;
    }
  } else {
    search = undefined;
  }

  return { page, limit, search };
};
