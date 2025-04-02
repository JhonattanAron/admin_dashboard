"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface MetricDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  metricType: string
  title: string
  description: string
}

export function MetricDetailModal({ open, onOpenChange, metricType, title, description }: MetricDetailModalProps) {
  // Datos de ejemplo para los diferentes tipos de métricas
  const revenueData = [
    { name: "Ene", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 2000 },
    { name: "Abr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
    { name: "Jul", value: 3490 },
    { name: "Ago", value: 4000 },
    { name: "Sep", value: 3000 },
    { name: "Oct", value: 2000 },
    { name: "Nov", value: 2780 },
    { name: "Dic", value: 1890 },
  ]

  const ordersData = [
    { name: "Ene", value: 120 },
    { name: "Feb", value: 150 },
    { name: "Mar", value: 180 },
    { name: "Abr", value: 220 },
    { name: "May", value: 270 },
    { name: "Jun", value: 250 },
    { name: "Jul", value: 300 },
    { name: "Ago", value: 350 },
    { name: "Sep", value: 380 },
    { name: "Oct", value: 400 },
    { name: "Nov", value: 450 },
    { name: "Dic", value: 500 },
  ]

  const expensesData = [
    { name: "Ene", value: 1200 },
    { name: "Feb", value: 1100 },
    { name: "Mar", value: 1300 },
    { name: "Abr", value: 1000 },
    { name: "May", value: 900 },
    { name: "Jun", value: 1100 },
    { name: "Jul", value: 1200 },
    { name: "Ago", value: 1300 },
    { name: "Sep", value: 1400 },
    { name: "Oct", value: 1500 },
    { name: "Nov", value: 1600 },
    { name: "Dic", value: 1700 },
  ]

  const customersData = [
    { name: "Ene", value: 20 },
    { name: "Feb", value: 25 },
    { name: "Mar", value: 30 },
    { name: "Abr", value: 35 },
    { name: "May", value: 40 },
    { name: "Jun", value: 45 },
    { name: "Jul", value: 50 },
    { name: "Ago", value: 55 },
    { name: "Sep", value: 60 },
    { name: "Oct", value: 65 },
    { name: "Nov", value: 70 },
    { name: "Dic", value: 75 },
  ]

  // Datos de tabla para cada tipo de métrica
  const revenueTableData = [
    { category: "Productos Electrónicos", amount: 25000, percentage: "55.3%" },
    { category: "Ropa", amount: 12000, percentage: "26.5%" },
    { category: "Accesorios", amount: 5000, percentage: "11.1%" },
    { category: "Hogar", amount: 3231.89, percentage: "7.1%" },
  ]

  const ordersTableData = [
    { status: "Entregado", count: 1250, percentage: "53.2%" },
    { status: "En proceso", count: 450, percentage: "19.1%" },
    { status: "Enviado", count: 350, percentage: "14.9%" },
    { status: "Pendiente", count: 200, percentage: "8.5%" },
    { status: "Cancelado", count: 100, percentage: "4.3%" },
  ]

  const expensesTableData = [
    { category: "Inventario", amount: 5000, percentage: "40.9%" },
    { category: "Alquiler", amount: 2500, percentage: "20.4%" },
    { category: "Salarios", amount: 3500, percentage: "28.6%" },
    { category: "Marketing", amount: 800, percentage: "6.5%" },
    { category: "Servicios", amount: 434.5, percentage: "3.6%" },
  ]

  const customersTableData = [
    { type: "Nuevos", count: 250, percentage: "43.6%" },
    { type: "Recurrentes", count: 323, percentage: "56.4%" },
  ]

  const renderContent = () => {
    switch (metricType) {
      case "revenue":
        return (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Ingresos por Mes</h3>
              <Card className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, "Ingresos"]} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Ingresos por Categoría</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Porcentaje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenueTableData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>${item.amount.toLocaleString()}</TableCell>
                      <TableCell>{item.percentage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )
      case "orders":
        return (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Pedidos por Mes</h3>
              <Card className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={ordersData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}`, "Pedidos"]} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Pedidos por Estado</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estado</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Porcentaje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordersTableData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>{item.percentage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )
      case "expenses":
        return (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Gastos por Mes</h3>
              <Card className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={expensesData}>
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, "Gastos"]} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Gastos por Categoría</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Porcentaje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expensesTableData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>${item.amount.toLocaleString()}</TableCell>
                      <TableCell>{item.percentage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )
      case "customers":
        return (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Clientes Activos por Mes</h3>
              <Card className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={customersData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}`, "Clientes"]} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Tipos de Clientes</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Porcentaje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customersTableData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>{item.percentage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )
      default:
        return <p>No hay información detallada disponible.</p>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">{renderContent()}</div>
      </DialogContent>
    </Dialog>
  )
}

