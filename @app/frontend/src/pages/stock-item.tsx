import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

const StockItemView = () => {
  // Sample data - replace with your actual data
  const stockItem = {
    id: "1",
    name: "Rice",
    description: "Premium Basmati Rice",
    quantity: 100,
    unit: "Kg",
    movements: [
      {
        id: "m1",
        quantity: 50,
        createdAt: new Date('2024-01-15'),
        description: "Initial stock",
        type: "IN",
        priceKes: 100
      },
      {
        id: "m2",
        quantity: 20,
        createdAt: new Date('2024-01-16'),
        description: "Sale to customer",
        type: "OUT",
        priceKes: 150
      }
    ]
  };

  // Calculate totals
  const calculateStats = () => {
    let totalIn = 0;
    let totalOut = 0;
    let totalCost = 0;
    let totalRevenue = 0;

    stockItem.movements.forEach(movement => {
      if (movement.type === 'IN') {
        totalIn += movement.quantity;
        totalCost += movement.quantity * movement.priceKes;
      } else {
        totalOut += movement.quantity;
        totalRevenue += movement.quantity * movement.priceKes;
      }
    });

    return {
      totalIn,
      totalOut,
      totalCost,
      totalRevenue,
      profit: totalRevenue - totalCost,
      currentStock: totalIn - totalOut
    };
  };

  const stats = calculateStats();

  return (
    <div className="container mx-auto max-w-4xl p-4 space-y-6">
      {/* Item Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{stockItem.name}</CardTitle>
          <CardDescription>{stockItem.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Current Stock</p>
              <p className="text-2xl font-bold">
                {stats.currentStock} {stockItem.unit}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Cost</p>
              <p className="text-2xl font-bold">
                KES {stats.totalCost.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">
                KES {stats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Profit</p>
              <p className={`text-2xl font-bold ${stats.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                KES {stats.profit.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Movements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Movements</CardTitle>
          <CardDescription>History of all stock movements</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price (KES)</TableHead>
                <TableHead>Total (KES)</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockItem.movements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>
                    {movement.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {movement.type === 'IN' ? (
                      <Badge className="bg-green-500">
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                        IN
                      </Badge>
                    ) : (
                      <Badge className="bg-red-500">
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                        OUT
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {movement.quantity} {stockItem.unit}
                  </TableCell>
                  <TableCell>
                    {movement.priceKes.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {(movement.quantity * movement.priceKes).toLocaleString()}
                  </TableCell>
                  <TableCell>{movement.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockItemView;