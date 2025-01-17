import { NewStockItemModal } from "@/components/modals/new-stock-item";
import { UpdateStockModal } from "@/components/modals/update-stock-item";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, History } from "lucide-react";
import { useState } from "react";

type StockItem = {
  id: number;
  name: string;
  description: string;
  quantity: number;
};

export default function StockPage() {
  const [stockItems, setStockItems] = useState<StockItem[]>([
    {
      id: 1,
      name: "Widget A",
      description: "High-quality metal widget",
      quantity: 150,
    },
    {
      id: 2,
      name: "Component B",
      description: "Plastic component for assembly",
      quantity: 300,
    },
    {
      id: 3,
      name: "Material C",
      description: "Raw material for manufacturing",
      quantity: 75,
    },
    // Add more items to demonstrate pagination
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 4,
      name: `Item ${String.fromCharCode(68 + i)}`,
      description: `Description for Item ${String.fromCharCode(68 + i)}`,
      quantity: Math.floor(Math.random() * 500) + 1,
    })),
  ]);

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sortedItems = [...stockItems].sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;
    switch (sortBy) {
      case "name":
        return order * a.name.localeCompare(b.name);
      case "quantity":
        return order * (a.quantity - b.quantity);
      default:
        return 0;
    }
  });

  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  // const handleRestock = (id: number) => {
  //   setStockItems((items) =>
  //     items.map((item) =>
  //       item.id === id ? { ...item, quantity: item.quantity + 10 } : item
  //     )
  //   );
  // };

  // const handleDeduct = (id: number) => {
  //   setStockItems((items) =>
  //     items.map((item) =>
  //       item.id === id && item.quantity > 0
  //         ? { ...item, quantity: item.quantity - 1 }
  //         : item
  //     )
  //   );
  // };

  const handleUpdateStock = (id: number, amount: number) => {
    setStockItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item
      )
    )
  }


  return (
    <div className="p-4 md:p-8 w-full max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Stock Management</h1>
        <NewStockItemModal
          onAddItem={(item) =>
            setStockItems((items) => [
              ...items,
              {
                id: items.length + 1,
                ...item,
              },
            ])
          }
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Sort by Name</SelectItem>
            <SelectItem value="quantity">Sort by Quantity</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>History</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <UpdateStockModal
                      isAdd={true}
                      itemName={item.name}
                      currentQuantity={item.quantity}
                      unit={
                        item.quantity === 1 ? "item" : "items"
                      }
                      onUpdate={(amount) => handleUpdateStock(item.id, amount)}
                    />
                    <UpdateStockModal
                      isAdd={false}
                      itemName={item.name}
                      currentQuantity={item.quantity}
                      unit={
                        item.quantity === 1 ? "item" : "items"
                      }
                      onUpdate={(amount) => handleUpdateStock(item.id, amount)}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <History className="mr-2 h-4 w-4" />
                    View History
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((page) => Math.max(1, page - 1));
              }}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(i + 1);
                }}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((page) => Math.min(totalPages, page + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
