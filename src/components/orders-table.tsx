"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Eye, MoreHorizontal, Search } from "lucide-react"
import { OrderDetailModal } from "./order-detail-modal"

export function OrdersTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Datos de ejemplo
  const orders = [
    {
      id: "ORD-001",
      customer: "Juan Pérez",
      date: "2023-04-01",
      total: 599.99,
      status: "Entregado",
      payment: "Pagado",
      items: 3,
    },
    {
      id: "ORD-002",
      customer: "Ana Martínez",
      date: "2023-04-02",
      total: 1299.99,
      status: "En proceso",
      payment: "Pagado",
      items: 5,
    },
    {
      id: "ORD-003",
      customer: "Carlos González",
      date: "2023-04-03",
      total: 89.99,
      status: "Enviado",
      payment: "Pagado",
      items: 1,
    },
    {
      id: "ORD-004",
      customer: "Laura Rodríguez",
      date: "2023-04-04",
      total: 299.99,
      status: "Pendiente",
      payment: "Pendiente",
      items: 2,
    },
    {
      id: "ORD-005",
      customer: "Miguel Fernández",
      date: "2023-04-05",
      total: 849.99,
      status: "Cancelado",
      payment: "Reembolsado",
      items: 4,
    },
  ]

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRowClick = (orderId: string) => {
    setSelectedOrderId(orderId)
    setModalOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar pedidos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-[250px] lg:w-[300px]"
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Pago</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No se encontraron pedidos.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(order.id)}
                >
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        order.status === "Entregado"
                          ? "bg-green-500"
                          : order.status === "Enviado"
                            ? "bg-blue-500"
                            : order.status === "En proceso"
                              ? "bg-yellow-500"
                              : order.status === "Pendiente"
                                ? "bg-orange-500"
                                : "bg-red-500"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={order.payment === "Pagado" ? "default" : "outline"}
                      className={
                        order.payment === "Pagado"
                          ? "bg-green-500"
                          : order.payment === "Pendiente"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }
                    >
                      {order.payment}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRowClick(order.id)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalles
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <OrderDetailModal open={modalOpen} onOpenChange={setModalOpen} orderId={selectedOrderId} />
    </div>
  )
}

