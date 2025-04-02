"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Edit, MoreHorizontal, Search, Trash, Calendar } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpenseDetailModal } from "./expense-detail-modal";

export function ExpensesTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const months = [
    { value: "all", label: "Todos los meses" },
    { value: "01", label: "Enero" },
    { value: "02", label: "Febrero" },
    { value: "03", label: "Marzo" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Mayo" },
    { value: "06", label: "Junio" },
    { value: "07", label: "Julio" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ];

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: "Compra de inventario",
      amount: 5000.0,
      date: "2023-04-01",
      category: "Inventario",
      supplier: "TechSupplies Inc.",
      status: "Pagado",
    },
    {
      id: 2,
      description: "Alquiler de local",
      amount: 1200.0,
      date: "2023-04-02",
      category: "Alquiler",
      supplier: "Inmobiliaria XYZ",
      status: "Pagado",
    },
    {
      id: 3,
      description: "Servicios públicos",
      amount: 350.0,
      date: "2023-03-03",
      category: "Servicios",
      supplier: "Empresa de Servicios",
      status: "Pagado",
    },
    {
      id: 4,
      description: "Salarios",
      amount: 3500.0,
      date: "2023-03-04",
      category: "Personal",
      supplier: "Empleados",
      status: "Pendiente",
    },
    {
      id: 5,
      description: "Marketing y publicidad",
      amount: 800.0,
      date: "2023-02-05",
      category: "Marketing",
      supplier: "Agencia de Marketing",
      status: "Pagado",
    },
    {
      id: 6,
      description: "Mantenimiento equipos",
      amount: 450.0,
      date: "2023-02-15",
      category: "Mantenimiento",
      supplier: "Servicio Técnico",
      status: "Pagado",
    },
    {
      id: 7,
      description: "Impuestos trimestrales",
      amount: 2300.0,
      date: "2023-01-20",
      category: "Impuestos",
      supplier: "Hacienda",
      status: "Pagado",
    },
  ]);

  const filteredExpenses = expenses.filter((expense) => {
    // Filtrar por término de búsqueda
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.supplier.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtrar por mes
    const matchesMonth =
      selectedMonth === "all" ||
      (expense.date && expense.date.split("-")[1] === selectedMonth);

    return matchesSearch && matchesMonth;
  });

  const handleDeleteExpense = (id: number) => {
    // En un caso real, aquí enviarías una solicitud a tu API
    setExpenses(expenses.filter((expense) => expense.id !== id));

    toast({
      title: "Gasto eliminado",
      description: "El gasto ha sido eliminado correctamente.",
    });
  };

  const handleRowClick = (expenseId: number) => {
    setSelectedExpenseId(expenseId);
    setModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar gastos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-[250px] lg:w-[300px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue placeholder="Seleccionar mes" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descripción</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Proveedor</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No se encontraron gastos.
                </TableCell>
              </TableRow>
            ) : (
              filteredExpenses.map((expense) => (
                <TableRow
                  key={expense.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(expense.id)}
                >
                  <TableCell className="font-medium">
                    {expense.description}
                  </TableCell>
                  <TableCell>${expense.amount.toFixed(2)}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.supplier}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        expense.status === "Pagado"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }
                    >
                      {expense.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
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
                            e.stopPropagation();
                            handleRowClick(expense.id);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            // Aquí podrías redirigir a la página de edición
                          }}
                        >
                          <Link
                            href={`/dashboard/gastos/editar/${expense.id}`}
                            className="flex items-center w-full"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <AlertDialog>
                            <AlertDialogTrigger className="flex items-center text-red-600 w-full">
                              <Trash className="mr-2 h-4 w-4" />
                              Eliminar
                            </AlertDialogTrigger>
                            <AlertDialogContent
                              onClick={(e) => e.stopPropagation()}
                            >
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  ¿Estás seguro?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Esto
                                  eliminará permanentemente el gasto y todos los
                                  datos asociados.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeleteExpense(expense.id)
                                  }
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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

      <ExpenseDetailModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        expenseId={selectedExpenseId}
      />
    </div>
  );
}
