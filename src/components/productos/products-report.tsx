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
import { format } from "date-fns"

interface ProductsReportProps {
  dateRange: {
    from: Date
    to: Date
  }
}

export function ProductsReport({ dateRange }: ProductsReportProps) {
  // Datos de ejemplo para el reporte de productos
  const topProducts = [
    { name: "Smartphone XYZ", value: 120 },
    { name: "Laptop Pro 15", value: 80 },
    { name: "Auriculares Bluetooth", value: 150 },
    { name: "Smartwatch Series 5", value: 70 },
    { name: "Cámara DSLR Pro", value: 50 },
  ]

  const productsByCategory = [
    { name: "Electrónica", value: 350 },
    { name: "Ropa", value: 200 },
    { name: "Accesorios", value: 180 },
    { name: "Hogar", value: 120 },
    { name: "Deportes", value: 90 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  const productPerformance = [
    {
      id: 1,
      name: "Smartphone XYZ",
      sales: 120,
      revenue: 71880,
      stock: 45,
      status: "En stock",
    },
    {
      id: 2,
      name: "Laptop Pro 15",
      sales: 80,
      revenue: 103999,
      stock: 12,
      status: "En stock",
    },
    {
      id: 3,
      name: "Auriculares Bluetooth",
      sales: 150,
      revenue: 13498,
      stock: 78,
      status: "En stock",
    },
    {
      id: 4,
      name: "Smartwatch Series 5",
      sales: 70,
      revenue: 20999,
      stock: 5,
      status: "Bajo stock",
    },
    {
      id: 5,
      name: "Cámara DSLR Pro",
      sales: 50,
      revenue: 42499,
      stock: 0,
      status: "Agotado",
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
            <div className="text-2xl font-bold">940</div>
            <p className="text-xs text-muted-foreground">+15 desde el periodo anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Productos Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">470</div>
            <p className="text-xs text-muted-foreground">+12.5% desde el periodo anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Productos Agotados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">-5 desde el periodo anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Bajo Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+10 desde el periodo anterior</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 print:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Productos Más Vendidos</CardTitle>
            <CardDescription>Top 5 productos con mayor número de ventas.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Unidades Vendidas" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Productos por Categoría</CardTitle>
            <CardDescription>Distribución de productos por categoría.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-[300px] h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productsByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {productsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
          <CardTitle>Rendimiento de Productos</CardTitle>
          <CardDescription>
            Desempeño de productos durante el periodo {format(dateRange.from, "dd/MM/yyyy")} -{" "}
            {format(dateRange.to, "dd/MM/yyyy")}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Ventas</TableHead>
                <TableHead>Ingresos</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productPerformance.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.sales} unidades</TableCell>
                  <TableCell>${product.revenue.toLocaleString()}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        product.status === "En stock"
                          ? "bg-green-500"
                          : product.status === "Bajo stock"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }
                    >
                      {product.status}
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

