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

interface SalesReportProps {
  dateRange: {
    from: Date
    to: Date
  }
}

export function SalesReport({ dateRange }: SalesReportProps) {
  // Datos de ejemplo para el reporte de ventas
  const salesData = [
    { name: "Ene", ventas: 4000, pedidos: 240 },
    { name: "Feb", ventas: 3000, pedidos: 198 },
    { name: "Mar", ventas: 2000, pedidos: 120 },
    { name: "Abr", ventas: 2780, pedidos: 180 },
    { name: "May", ventas: 1890, pedidos: 110 },
    { name: "Jun", ventas: 2390, pedidos: 140 },
    { name: "Jul", ventas: 3490, pedidos: 220 },
    { name: "Ago", ventas: 4000, pedidos: 250 },
    { name: "Sep", ventas: 3000, pedidos: 210 },
    { name: "Oct", ventas: 2000, pedidos: 150 },
    { name: "Nov", ventas: 2780, pedidos: 190 },
    { name: "Dic", ventas: 1890, pedidos: 120 },
  ]

  const salesByCategory = [
    { name: "Electrónica", value: 25000 },
    { name: "Ropa", value: 12000 },
    { name: "Accesorios", value: 5000 },
    { name: "Hogar", value: 3231 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const recentSales = [
    {
      id: "ORD-001",
      customer: "Juan Pérez",
      date: "2023-04-01",
      amount: 599.99,
      status: "Entregado",
    },
    {
      id: "ORD-002",
      customer: "Ana Martínez",
      date: "2023-04-02",
      amount: 1299.99,
      status: "En proceso",
    },
    {
      id: "ORD-003",
      customer: "Carlos González",
      date: "2023-04-03",
      amount: 89.99,
      status: "Enviado",
    },
    {
      id: "ORD-004",
      customer: "Laura Rodríguez",
      date: "2023-04-04",
      amount: 299.99,
      status: "Pendiente",
    },
    {
      id: "ORD-005",
      customer: "Miguel Fernández",
      date: "2023-04-05",
      amount: 849.99,
      status: "Cancelado",
    },
  ]

  return (
    <div className="space-y-4 print:space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% desde el periodo anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">+15.2% desde el periodo anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$19.25</div>
            <p className="text-xs text-muted-foreground">+4.3% desde el periodo anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% desde el periodo anterior</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 print:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Ventas vs Pedidos</CardTitle>
            <CardDescription>Comparativa de ventas y pedidos durante el periodo seleccionado.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="ventas" name="Ventas ($)" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="pedidos" name="Pedidos" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Ventas por Categoría</CardTitle>
            <CardDescription>Distribución de ventas por categoría de producto.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-[300px] h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {salesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Ventas"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ventas Recientes</CardTitle>
          <CardDescription>
            Últimas ventas realizadas durante el periodo {format(dateRange.from, "dd/MM/yyyy")} -{" "}
            {format(dateRange.to, "dd/MM/yyyy")}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>${sale.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        sale.status === "Entregado"
                          ? "bg-green-500"
                          : sale.status === "Enviado"
                            ? "bg-blue-500"
                            : sale.status === "En proceso"
                              ? "bg-yellow-500"
                              : sale.status === "Pendiente"
                                ? "bg-orange-500"
                                : "bg-red-500"
                      }
                    >
                      {sale.status}
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

