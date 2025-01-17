import StockItemPage from "@/pages/stock-item";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stock/$stockItemId")({
  component: StockItemPage,
});
