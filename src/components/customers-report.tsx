"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CustomersReportProps {
  dateRange: {
    from: Date
    to: Date
  }
}

export function CustomersReport({ dateRange }: CustomersReportProps) {
  // Datos de ejemplo para el reporte de clientes
  const customerGrowth = [
    { name: "Ene", nuevos: 40, recurrentes: 24 },
    { name: "Feb", nuevos: 30, recurrentes: 28 },
    { name: "Mar", nuevos: 20, recurrentes: 30 },
    { name: "Abr", nuevos: 27, recurrentes: 32 },
    { name: "May", nuevos: 18, recurrentes: 35 },
    { name: "Jun", nuevos: 23, recurrentes: 38 },
    { name: "Jul", nuevos: 34, recurrentes: 40 },
    { name: "Ago", nuevos: 40, recurrentes: 42 },
    { name: "Sep", nuevos: 30, recurrentes: 45 },
    { name: "Oct", nuevos: 20, recurrentes: 48 },
    { name: "Nov", nuevos: 27, recurrentes: 50 },
    { name: "Dic", nuevos: 18, recurrentes: 52 },
  ]

  const customerSegmentation = [
    { name: "VIP", value: 120 },
    { name: "Regular", value: 300 },
    { name: "Ocasional", value: 150 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

  const topCustomers = [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan.perez@email.com",
      orders: 24,
      spent: 4325.0,
      status: "VIP",
    },
    {
      id: 2,
      name: "Ana Martínez",
      email: "ana.martinez@email.com",
      orders: 18,
      spent: 3752.0,
      status: "VIP",
    },
    {
      id: 3,
      name: "Carlos González",
      email: "carlos.gonzalez@email.com",
      orders: 15,
      spent: 2890.0,
      status: "Regular",
    },
    {
      id: 4,
      name: "Laura Rodríguez",
      email: "laura.rodriguez@email.com",
      orders: 12,
      spent: 2150.0,
      status: "Regular",
    },
    {
      id: 5,
      name: "Miguel Fernández",
      email: "miguel.fernandez@email.com",
      orders: 10,
      spent: 1875.0,
      status: "Regular",
    },
  ]

  return (
    <div className="space-y-4 print:space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">570</div>
            <p className="text-xs text-muted-foreground">+45 desde el periodo anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clientes Nuevos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">+15.2% desde el periodo anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Retención</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+3.5% desde el periodo anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor de Vida del Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$850</div>
            <p className="text-xs text-muted-foreground">+$75 desde el periodo anterior</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 print:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Crecimiento de Clientes</CardTitle>
            <CardDescription>Evolución de clientes nuevos vs recurrentes.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={customerGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="nuevos" name="Clientes Nuevos" stroke="#8884d8" strokeWidth={2} />
                <Line
                  type="monotone"
                  dataKey="recurrentes"
                  name="Clientes Recurrentes"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Segmentación de Clientes</CardTitle>
            <CardDescription>Distribución de clientes por segmento.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-[300px] h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSegmentation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {customerSegmentation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} clientes`, "Cantidad"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mejores Clientes</CardTitle>
          <CardDescription>
            Clientes con mayor valor durante el periodo {format(dateRange.from, "dd/MM/yyyy")} -{" "}
            {format(dateRange.to, "dd/MM/yyyy")}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Pedidos</TableHead>
                <TableHead>Gasto Total</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9 mr-2">
                        <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                        <AvatarFallback>
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>${customer.spent.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={customer.status === "VIP" ? "bg-green-500" : ""}>{customer.status}</Badge>
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

