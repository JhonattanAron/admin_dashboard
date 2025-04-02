"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface InventoryReportProps {
  dateRange: {
    from: Date
    to: Date
  }
}

export function InventoryReport({ dateRange }: InventoryReportProps) {
  // Datos de ejemplo para el reporte de inventario
  const inventoryByCategory = [
    { name: "Electrónica", value: 250 },
    { name: "Ropa", value: 180 },
    { name: "Accesorios", value: 120 },
    { name: "Hogar", value: 90 },
    { name: "Deportes", value: 60 },
  ]

  const inventoryStatus = [
    { name: "En stock", value: 450 },
    { name: "Bajo stock", value: 120 },
    { name: "Agotado", value: 50 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]
  const STATUS_COLORS = ["#22c55e", "#eab308", "#ef4444"]

  const lowStockProducts = [
    {
      id: 1,
      name: "Smartphone XYZ",
      image: "/placeholder.svg",
      stock: 5,
      minStock: 10,
      supplier: "TechSupplies Inc.",
    },
    {
      id: 2,
      name: "Laptop Pro 15",
      image: "/placeholder.svg",
      stock: 3,
      minStock: 8,
      supplier: "TechSupplies Inc.",
    },
    {
      id: 3,
      name: "Auriculares Bluetooth",
      image: "/placeholder.svg",
      stock: 7,
      minStock: 15,
      supplier: "AudioTech",
    },
    {
      id: 4,
      name: "Smartwatch Series 5",
      image: "/placeholder.svg",
      stock: 2,
      minStock: 10,
      supplier: "WearTech",
    },
    {
      id: 5,
      name: "Cámara DSLR Pro",
      image: "/placeholder.svg",
      stock: 0,
      minStock: 5,
      supplier: "PhotoPro",
    },
  ]

  return (
    <div className="space-y-4 print:space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">620</div>
            <p className="text-xs text-muted-foreground">En inventario actual</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor de Inventario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125,450</div>
            <p className="text-xs text-muted-foreground">Costo total del inventario</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Productos Agotados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50</div>
            <p className="text-xs text-muted-foreground">Requieren reposición</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Bajo Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">Por debajo del mínimo</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 print:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Inventario por Categoría</CardTitle>
            <CardDescription>Distribución de productos por categoría.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={inventoryByCategory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Cantidad" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Estado del Inventario</CardTitle>
            <CardDescription>Distribución por estado de stock.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-[300px] h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {inventoryStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} productos`, "Cantidad"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Productos con Bajo Stock</CardTitle>
          <CardDescription>Productos que requieren reposición urgente.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Imagen</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Stock Actual</TableHead>
                <TableHead>Stock Mínimo</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStockProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.minStock}</TableCell>
                  <TableCell>{product.supplier}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        product.stock === 0
                          ? "bg-red-500"
                          : product.stock < product.minStock
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }
                    >
                      {product.stock === 0 ? "Agotado" : "Bajo Stock"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

