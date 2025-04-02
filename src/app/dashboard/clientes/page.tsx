import { CustomersTable } from "@/components/customers-table";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";

export default function CustomersPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Clientes"
        text="Gestiona los clientes de tu tienda."
      />
      <div>
        <CustomersTable />
      </div>
    </DashboardShell>
  );
}
