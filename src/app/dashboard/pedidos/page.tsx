import { OrdersTable } from "@/components/orders-table";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";

export default function OrdersPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Pedidos"
        text="Gestiona los pedidos de tu tienda."
      />
      <div>
        <OrdersTable />
      </div>
    </DashboardShell>
  );
}
