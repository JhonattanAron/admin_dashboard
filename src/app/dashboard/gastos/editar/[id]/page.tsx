import { ExpenseForm } from "@/components/expense-form";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";

interface EditExpensePageProps {
  params: {
    id: string;
  };
}

export default function EditExpensePage({ params }: EditExpensePageProps) {
  // En un caso real, aquí cargarías los datos del gasto según el ID
  const expenseId = params.id;

  // Datos de ejemplo para el gasto con este ID
  const expenseData = {
    id: Number.parseInt(expenseId),
    description: "Compra de inventario",
    amount: 5000.0,
    date: "2023-04-01",
    category: "Inventario",
    supplier: "TechSupplies Inc.",
    status: "paid",
    notes: "Compra de productos electrónicos para reposición de inventario",
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Editar Gasto"
        text="Modifica la información del gasto."
      />
      <div className="grid gap-8">
        <ExpenseForm initialData={expenseData} isEditing={true} />
      </div>
    </DashboardShell>
  );
}
