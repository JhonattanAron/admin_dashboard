"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Package,
  Truck,
  Factory,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface OrderDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string | null;
}

export function OrderDetailModal({
  open,
  onOpenChange,
  orderId,
}: OrderDetailModalProps) {
  const [comentario, setComentario] = useState("");
  const [estadoOtro, setEstadoOtro] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState("");
  const handleActualizarEstado = () => {
    if (!nuevoEstado) {
      toast({
        title: "Error",
        description: "Debe seleccionar un estado",
        variant: "destructive",
      });
      return;
    }
  };

  // En un caso real, aquí cargarías los datos del pedido según el ID
  // Estos son datos de ejemplo
  const orderDetails = {
    id: orderId || "ORD-001",
    customer: {
      name: "Juan Pérez",
      email: "juan.perez@email.com",
      phone: "+34 612 345 678",
      address: "Calle Principal 123, Madrid, España",
    },
    date: "2023-04-01",
    total: 599.99,
    status: "Entregado",
    payment: "Pagado",
    paymentMethod: "Tarjeta de crédito",
    shippingMethod: "Envío estándar",
    trackingNumber: "TRK123456789",
    items: [
      {
        id: "PROD-001",
        name: "Smartphone XYZ",
        image: "/placeholder.svg",
        price: 399.99,
        quantity: 1,
        total: 399.99,
        source: "proveedor",
        supplier: "TechSupplies Inc.",
        status: "En stock",
      },
      {
        id: "PROD-002",
        name: "Funda protectora",
        image: "/placeholder.svg",
        price: 19.99,
        quantity: 2,
        total: 39.98,
        source: "fabricación",
        productionTime: "3 días",
        status: "En producción",
      },
      {
        id: "PROD-003",
        name: "Cargador rápido",
        image: "/placeholder.svg",
        price: 29.99,
        quantity: 1,
        total: 29.99,
        source: "proveedor",
        supplier: "ElectroComponents",
        status: "Pendiente de envío",
      },
      {
        id: "PROD-004",
        name: "Protector de pantalla",
        image: "/placeholder.svg",
        price: 9.99,
        quantity: 2,
        total: 19.98,
        source: "stock",
        status: "Listo para envío",
      },
      {
        id: "PROD-005",
        name: "Auriculares Bluetooth",
        image: "/placeholder.svg",
        price: 49.99,
        quantity: 1,
        total: 49.99,
        source: "proveedor",
        supplier: "AudioTech",
        status: "En tránsito",
      },
      {
        id: "PROD-006",
        name: "Soporte para coche",
        image: "/placeholder.svg",
        price: 15.99,
        quantity: 1,
        total: 15.99,
        source: "fabricación",
        productionTime: "2 días",
        status: "En cola de producción",
      },
    ],
    timeline: [
      {
        date: "2023-04-01 10:15",
        status: "Pedido recibido",
        description:
          "El pedido ha sido recibido y está pendiente de procesamiento.",
      },
      {
        date: "2023-04-01 14:30",
        status: "Pago confirmado",
        description:
          "El pago ha sido confirmado y el pedido está siendo procesado.",
      },
    ],
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "proveedor":
        return <Truck className="h-4 w-4 mr-1" />;
      case "fabricación":
        return <Factory className="h-4 w-4 mr-1" />;
      case "stock":
        return <Package className="h-4 w-4 mr-1" />;
      default:
        return <Package className="h-4 w-4 mr-1" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "En stock":
      case "Listo para envío":
        return <CheckCircle className="h-4 w-4 mr-1 text-green-500" />;
      case "En producción":
      case "En cola de producción":
      case "Pendiente de envío":
      case "En tránsito":
        return <Clock className="h-4 w-4 mr-1 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En stock":
      case "Listo para envío":
        return "bg-green-500";
      case "En producción":
      case "En cola de producción":
      case "Pendiente de envío":
      case "En tránsito":
        return "bg-yellow-500";
      default:
        return "bg-red-500";
    }
  };

  if (!orderId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalles del Pedido #{orderDetails.id}</DialogTitle>
          <DialogDescription>
            Pedido realizado el {orderDetails.date} por{" "}
            {orderDetails.customer.name}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="products" className="mt-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="customer">Cliente</TabsTrigger>
            <TabsTrigger value="timeline">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Estado del Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge
                    className={
                      orderDetails.status === "Entregado"
                        ? "bg-green-500"
                        : orderDetails.status === "Enviado"
                        ? "bg-blue-500"
                        : orderDetails.status === "En proceso"
                        ? "bg-yellow-500"
                        : orderDetails.status === "Pendiente"
                        ? "bg-orange-500"
                        : "bg-red-500"
                    }
                  >
                    {orderDetails.status}
                  </Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pago</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge
                    className={
                      orderDetails.payment === "Pagado"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }
                  >
                    {orderDetails.payment}
                  </Badge>
                  <p className="text-sm mt-1">{orderDetails.paymentMethod}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Productos del Pedido</CardTitle>
                <CardDescription>
                  Lista de productos incluidos en este pedido.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Imagen</TableHead>
                      <TableHead>Producto</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Origen</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderDetails.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getSourceIcon(item.source)}
                            <span className="capitalize">
                              {item.source === "proveedor"
                                ? `${item.source}: ${item.supplier}`
                                : item.source}
                              {item.source === "fabricación" &&
                                ` (${item.productionTime})`}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getStatusIcon(item.status)}
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-end mt-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      Subtotal: ${(orderDetails.total - 10).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Envío: $10.00
                    </p>
                    <p className="text-lg font-bold">
                      Total: ${orderDetails.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customer" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Información del Cliente</CardTitle>
                <CardDescription>
                  Datos de contacto y dirección de envío.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>
                      {orderDetails.customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {orderDetails.customer.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {orderDetails.customer.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">
                      Información de Contacto
                    </h4>
                    <p className="text-sm">
                      Email: {orderDetails.customer.email}
                    </p>
                    <p className="text-sm">
                      Teléfono: {orderDetails.customer.phone}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Dirección de Envío</h4>
                    <p className="text-sm">{orderDetails.customer.address}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium mb-2">Información de Envío</h4>
                  <p className="text-sm">
                    Método de envío: {orderDetails.shippingMethod}
                  </p>
                  <p className="text-sm">
                    Número de seguimiento: {orderDetails.trackingNumber}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Historial del Pedido</CardTitle>
                <CardDescription>
                  Seguimiento del estado del pedido a lo largo del tiempo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative border-l border-gray-200 dark:border-gray-700 ml-3 pl-8 space-y-6">
                  {orderDetails.timeline.map((event, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-10 mt-1.5 h-4 w-4 rounded-full bg-primary"></div>
                      <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
                        {event.date}
                      </time>
                      <h3 className="text-lg font-semibold">{event.status}</h3>
                      <p className="text-base font-normal text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                  ))}
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="font-medium">Actualizar estado</div>
                        <div className="flex items-center space-x-2">
                          {nuevoEstado === "otro" ? (
                            <input
                              type="text"
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Especificar estado"
                              value={estadoOtro} // Use comentario to store the custom state
                              onChange={(e) => setEstadoOtro(e.target.value)} // Update comentario
                            />
                          ) : (
                            <Select
                              value={nuevoEstado}
                              onValueChange={(value) => {
                                setNuevoEstado(value);
                                if (value !== "otro") setComentario(""); // Clear comentario if not "otro"
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar nuevo estado" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pendiente">
                                  Pendiente
                                </SelectItem>
                                <SelectItem value="procesando">
                                  Procesando
                                </SelectItem>
                                <SelectItem value="enviado">Enviado</SelectItem>
                                <SelectItem value="entregado">
                                  Entregado
                                </SelectItem>
                                <SelectItem value="cancelado">
                                  Cancelado
                                </SelectItem>
                                <SelectItem value="otro">Otro</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                          <Button
                            variant="outline"
                            onClick={() => {
                              if (nuevoEstado === "otro") {
                                setNuevoEstado("");
                                setComentario(""); // Clear comentario when toggling back
                              } else {
                                setNuevoEstado("otro");
                              }
                            }}
                          >
                            {nuevoEstado === "otro"
                              ? "Usar Select"
                              : "Especificar Otro"}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="font-medium">Comentario</div>
                        <textarea
                          className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Agregar comentario (opcional)"
                          value={comentario}
                          onChange={(e) => setComentario(e.target.value)}
                        />
                      </div>

                      <Button onClick={handleActualizarEstado}>
                        Actualizar estado
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
