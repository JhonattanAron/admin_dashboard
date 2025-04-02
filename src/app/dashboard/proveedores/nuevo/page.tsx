import { SupplierForm } from "@/components/supplier-form";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";

export default function NewSupplierPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Crear Proveedor"
        text="Añade un nuevo proveedor a tu tienda."
      />
      <div className="grid gap-8">
        <SupplierForm />
      </div>
    </DashboardShell>
  );
}
