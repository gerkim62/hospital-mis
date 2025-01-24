import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, ZodIssue } from "zod";
import { ApiResponseType } from "../types/api";

// Error-handling middleware
export const errorHandlerMiddleware = (
  err: unknown,
  req: Request,
  res: Response<ApiResponseType<null, ZodIssue[], false>>,
  next: NextFunction
): void => {
  if (err instanceof ZodError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please enter the details correctly and then retry.",
      error: err.issues,
      success: false,
    });
    return;
  }

  // Handle other errors (default 500)
  console.error(err);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Sorry, something went wrong on the server. Please try again.",
    error: [],
  });
};

