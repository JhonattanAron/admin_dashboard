import { ExpenseForm } from "@/components/expense-form";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";

export default function NewExpensePage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Crear Gasto"
        text="Añade un nuevo gasto a tu registro."
      />
      <div className="grid gap-8">
        <ExpenseForm />
      </div>
    </DashboardShell>
  );
}
