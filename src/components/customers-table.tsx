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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export function CustomersTable() {
  const [searchTerm, setSearchTerm] = useState("")

  // Datos de ejemplo
  const customers = [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan.perez@email.com",
      orders: 24,
      spent: 4325.0,
      status: "VIP",
      lastOrder: "2023-04-01",
    },
    {
      id: 2,
      name: "Ana Martínez",
      email: "ana.martinez@email.com",
      orders: 18,
      spent: 3752.0,
      status: "VIP",
      lastOrder: "2023-04-02",
    },
    {
      id: 3,
      name: "Carlos González",
      email: "carlos.gonzalez@email.com",
      orders: 15,
      spent: 2890.0,
      status: "Regular",
      lastOrder: "2023-04-03",
    },
    {
      id: 4,
      name: "Laura Rodríguez",
      email: "laura.rodriguez@email.com",
      orders: 12,
      spent: 2150.0,
      status: "Regular",
      lastOrder: "2023-04-04",
    },
    {
      id: 5,
      name: "Miguel Fernández",
      email: "miguel.fernandez@email.com",
      orders: 10,
      spent: 1875.0,
      status: "Regular",
      lastOrder: "2023-04-05",
    },
  ]

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes..."
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
              <TableHead>Cliente</TableHead>
              <TableHead>Pedidos</TableHead>
              <TableHead>Gasto Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Último Pedido</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No se encontraron clientes.
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
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
                  <TableCell>{customer.lastOrder}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link href={`/dashboard/clientes/${customer.id}`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalles
                          </Link>
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
    </div>
  )
}

