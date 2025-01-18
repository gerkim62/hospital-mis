import { ZodIssue } from "zod";

export type PaginationMeta = {
  returned_count: number;
  available_count: number;
  pages_count: number;
  current_page: number;
  has_next: boolean;
  has_prev: boolean;
  links: {
    next: string | null;
    prev: string | null;
    self: string;
  };
};

export type ApiResponseType<TData, TError = ZodIssue[]> =
  | {
      success: true;
      message: string;
      data: TData;
      pagination?: PaginationMeta;
    }
  | {
      success: false;
      message: string;
      data: TError;
    };