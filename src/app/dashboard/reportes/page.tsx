"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Download, Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { SalesReport } from "@/components/sales-report";
import { ProductsReport } from "@/components/productos/products-report";
import { CustomersReport } from "@/components/customers-report";
import { InventoryReport } from "@/components/inventory-report";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const [reportFormat, setReportFormat] = useState("pdf");

  const handleExport = () => {
    // En un caso real, aquí implementarías la lógica para exportar el reporte
    alert(`Exportando reporte en formato ${reportFormat}...`);
  };

  const handlePrint = () => {
    // En un caso real, aquí implementarías la lógica para imprimir el reporte
    window.print();
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Reportes"
        text="Genera y visualiza reportes detallados de tu tienda."
      />

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Filtros de Reporte</CardTitle>
            <CardDescription>
              Personaliza los parámetros para generar tu reporte.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Rango de Fechas</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "PPP", { locale: es })} -{" "}
                            {format(dateRange.to, "PPP", { locale: es })}
                          </>
                        ) : (
                          format(dateRange.from, "PPP", { locale: es })
                        )
                      ) : (
                        <span>Seleccionar fechas</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={(range) => {
                        if (range?.from && range?.to) {
                          setDateRange({ from: range.from, to: range.to });
                        }
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Formato de Exportación</Label>
                <Select
                  defaultValue={reportFormat}
                  onValueChange={setReportFormat}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end space-x-2">
                <Button className="flex-1" onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="sales">Ventas</TabsTrigger>
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="customers">Clientes</TabsTrigger>
            <TabsTrigger value="inventory">Inventario</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-4">
            <SalesReport dateRange={dateRange} />
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <ProductsReport dateRange={dateRange} />
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <CustomersReport dateRange={dateRange} />
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <InventoryReport dateRange={dateRange} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}
