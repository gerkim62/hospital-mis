import { Request } from "express";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;
const DEFAULT_PAGE = 1;

interface Pagination {
  page: number;
  limit: number;
  offset: number;
}

/**
 * Extracts pagination details from the request query and returns a pagination object.
 * @param req - The Express request object.
 * @returns Pagination object containing page, limit, and offset.
 */
function getPagination(req: Request): Pagination {
  const pageQuery = req.query["page"];
  const limitQuery = req.query["limit"] || req.query["size"];

  let page = DEFAULT_PAGE;
  let limit = DEFAULT_LIMIT;

  if (typeof pageQuery === "string" && !isNaN(parseInt(pageQuery))) {
    page = Math.max(parseInt(pageQuery), 1);
  }

  if (typeof limitQuery === "string" && !isNaN(parseInt(limitQuery))) {
    limit = Math.min(parseInt(limitQuery), MAX_LIMIT);
  }

  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

export default getPagination;
