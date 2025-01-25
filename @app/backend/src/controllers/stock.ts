import prisma from "../config/prisma";
import { NewStockItemOutput } from "../validation/stock-item";

async function createStockItem(data: NewStockItemOutput) {
  const item = await prisma.stockItem.create({
    data,
  });

  return item;
}

export { createStockItem };
