import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ExpensesTable } from "@/components/expenses-table";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import Link from "next/link";

export default function ExpensesPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Gastos"
        text="Gestiona los gastos de tu tienda."
      >
        <Link href="/dashboard/gastos/nuevo">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Gasto
          </Button>
        </Link>
      </DashboardHeader>
      <div>
        <ExpensesTable />
      </div>
    </DashboardShell>
  );
}
