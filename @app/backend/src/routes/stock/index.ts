import prisma from "@app/backend/config/prisma";
import { createStockItem } from "@app/backend/controllers/stock";
import { ApiResponseType } from "@app/backend/types/api";
import getPagination from "@app/backend/utils/pagination";
import { NewStockItemSchema } from "@app/backend/validation/stock-item";
import { StockItem } from "@prisma/client";
import { Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import z from "zod";

const stockRouter = Router();

stockRouter.get(
  "/",
  async (req, res: Response<ApiResponseType<StockItem[]>>) => {
    const { searchTerm } = z
      .object({
        search_term: z.string().catch(""),
      })
      .transform((data) => {
        return {
          searchTerm: data.search_term.trim(),
        };
      })
      .parse(req.query);

    const pagination: {
      page: number;
      limit: number;
      offset: number;
    } = getPagination(req);

    console.log(searchTerm, pagination);

    const stockItems = await prisma.stockItem.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
      skip: pagination.offset,
      take: pagination.limit,
    });

    res.json({
      success: true,
      message: "Successfully retrieved stock items",
      data: stockItems,
    });
  }
);

stockRouter.post(
  "/",
  async (req, res: Response<ApiResponseType<StockItem>>) => {
    console.log(req.body);
    const data = NewStockItemSchema.parse(req.body);

    const stockItem = await createStockItem(data);

    res.status(StatusCodes.CREATED).json({
      data: stockItem,
      success: true,
      message: "Stock item added successfully.",
    });
  }
);

export default stockRouter;
