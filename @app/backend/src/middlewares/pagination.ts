import { NextFunction, Request, Response } from "express";

declare module "express" {
  interface Request {
    pagination?: {
      page: number;
      limit: number;
      offset: number;
    };
  }
}

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;
const DEFAULT_PAGE = 1;

function paginate(req: Request, _: Response, next: NextFunction): void {
  console.log("Paginate middleware");
  const pagination = {
    page: DEFAULT_PAGE,
    limit: DEFAULT_LIMIT,
    offset: (DEFAULT_PAGE - 1) * DEFAULT_LIMIT,
  };

  const page = req.query["page"];
  const limit = req.query["limit"] || req.query["size"];

  if (typeof page === "string" && !isNaN(parseInt(page))) {
    pagination.page = Math.max(parseInt(page), 1);
  }

  if (typeof limit === "string" && !isNaN(parseInt(limit))) {
    pagination.limit = Math.min(parseInt(limit), MAX_LIMIT);
  }

  const offset = (pagination.page - 1) * pagination.limit;

  pagination.offset = offset;

  req.pagination = pagination;

  next();
}

export default paginate;
