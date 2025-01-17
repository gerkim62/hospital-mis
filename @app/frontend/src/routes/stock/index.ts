import StockPage from '@/pages/stock';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/stock/')({
  component: StockPage,
});

