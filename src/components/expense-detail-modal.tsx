"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  Calendar,
  FileText,
  Building,
  CreditCard,
  Receipt,
  Tag,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ExpenseDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  expenseId: number | null
}

export function ExpenseDetailModal({ open, onOpenChange, expenseId }: ExpenseDetailModalProps) {
  // En un caso real, aquí cargarías los datos del gasto según el ID
  // Estos son datos de ejemplo
  const expenseDetails = {
    id: expenseId || 1,
    description: "Compra de inventario",
    amount: 5000.0,
    date: "2023-04-01",
    category: "Inventario",
    supplier: "TechSupplies Inc.",
    status: "Pagado",
    paymentMethod: "Transferencia bancaria",
    invoiceNumber: "INV-2023-0456",
    notes: "Compra de productos electrónicos para reposición de inventario",
    approvedBy: "Carlos Martínez",
    approvalDate: "2023-03-28",
    items: [
      {
        id: "ITEM-001",
        description: "Smartphone XYZ",
        quantity: 10,
        unitPrice: 300.0,
        total: 3000.0,
      },
      {
        id: "ITEM-002",
        description: "Auriculares Bluetooth",
        quantity: 20,
        unitPrice: 50.0,
        total: 1000.0,
      },
      {
        id: "ITEM-003",
        description: "Cargadores rápidos",
        quantity: 25,
        unitPrice: 20.0,
        total: 500.0,
      },
      {
        id: "ITEM-004",
        description: "Protectores de pantalla",
        quantity: 50,
        unitPrice: 5.0,
        total: 250.0,
      },
      {
        id: "ITEM-005",
        description: "Fundas protectoras",
        quantity: 25,
        unitPrice: 10.0,
        total: 250.0,
      },
    ],
    relatedExpenses: [
      {
        id: 2,
        description: "Transporte de inventario",
        amount: 350.0,
        date: "2023-04-02",
        category: "Transporte",
        status: "Pagado",
      },
      {
        id: 3,
        description: "Seguro de mercancía",
        amount: 200.0,
        date: "2023-04-01",
        category: "Seguros",
        status: "Pagado",
      },
    ],
    monthlyExpenses: [
      { month: "Ene", amount: 4200 },
      { month: "Feb", amount: 4500 },
      { month: "Mar", amount: 4800 },
      { month: "Abr", amount: 5000 },
      { month: "May", amount: 4300 },
      { month: "Jun", amount: 4600 },
      { month: "Jul", amount: 4900 },
      { month: "Ago", amount: 5200 },
      { month: "Sep", amount: 4400 },
      { month: "Oct", amount: 4700 },
      { month: "Nov", amount: 5000 },
      { month: "Dic", amount: 5300 },
    ],
    categoryDistribution: [
      { category: "Inventario", amount: 5000 },
      { category: "Transporte", amount: 350 },
      { category: "Seguros", amount: 200 },
      { category: "Alquiler", amount: 1200 },
      { category: "Servicios", amount: 450 },
      { category: "Personal", amount: 3500 },
    ],
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pagado":
        return <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
      case "Pendiente":
        return <Clock className="h-4 w-4 mr-1 text-yellow-500" />
      case "Cancelado":
        return <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
      default:
        return <Clock className="h-4 w-4 mr-1 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pagado":
        return "bg-green-500"
      case "Pendiente":
        return "bg-yellow-500"
      case "Cancelado":
        return "bg-red-500"
      default:
        return "bg-yellow-500"
    }
  }

  if (!expenseId) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalles del Gasto #{expenseDetails.id}</DialogTitle>
          <DialogDescription>
            {expenseDetails.description} - {expenseDetails.date}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="items">Elementos</TabsTrigger>
            <TabsTrigger value="analytics">Análisis</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Monto</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-2xl font-bold">${expenseDetails.amount.toFixed(2)}</span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Estado</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center">
                  {getStatusIcon(expenseDetails.status)}
                  <Badge className={getStatusColor(expenseDetails.status)}>{expenseDetails.status}</Badge>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Información del Gasto</CardTitle>
                <CardDescription>Detalles completos del gasto registrado.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Fecha</p>
                        <p className="text-sm text-muted-foreground">{expenseDetails.date}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Tag className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Categoría</p>
                        <p className="text-sm text-muted-foreground">{expenseDetails.category}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Building className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Proveedor</p>
                        <p className="text-sm text-muted-foreground">{expenseDetails.supplier}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CreditCard className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Método de Pago</p>
                        <p className="text-sm text-muted-foreground">{expenseDetails.paymentMethod}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Receipt className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Número de Factura</p>
                        <p className="text-sm text-muted-foreground">{expenseDetails.invoiceNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Aprobado por</p>
                        <p className="text-sm text-muted-foreground">
                          {expenseDetails.approvedBy} ({expenseDetails.approvalDate})
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Notas</p>
                      <p className="text-sm text-muted-foreground">{expenseDetails.notes}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gastos Relacionados</CardTitle>
                <CardDescription>Otros gastos relacionados con esta transacción.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Monto</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenseDetails.relatedExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell className="font-medium">#{expense.id}</TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell>${expense.amount.toFixed(2)}</TableCell>
                        <TableCell>{expense.date}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(expense.status)}>{expense.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="items" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Elementos del Gasto</CardTitle>
                <CardDescription>Desglose detallado de los elementos incluidos en este gasto.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Precio Unitario</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenseDetails.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                        <TableCell>${item.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4} className="text-right font-bold">
                        Total
                      </TableCell>
                      <TableCell className="font-bold">${expenseDetails.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tendencia Mensual</CardTitle>
                <CardDescription>Gastos mensuales en la categoría {expenseDetails.category}.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={expenseDetails.monthlyExpenses}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, "Gasto"]} />
                    <Legend />
                    <Bar dataKey="amount" name="Monto" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución por Categoría</CardTitle>
                <CardDescription>Distribución de gastos por categoría en el mes actual.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={expenseDetails.categoryDistribution}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `$${value}`} />
                    <YAxis type="category" dataKey="category" />
                    <Tooltip formatter={(value) => [`$${value}`, "Gasto"]} />
                    <Legend />
                    <Bar dataKey="amount" name="Monto" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

