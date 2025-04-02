import { SupplierForm } from "@/components/supplier-form";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";

interface EditSupplierPageProps {
  params: {
    id: string;
  };
}

export default function EditSupplierPage({ params }: EditSupplierPageProps) {
  // En un caso real, aquí cargarías los datos del proveedor según el ID
  const supplierId = params.id;

  // Datos de ejemplo para el proveedor con este ID
  const supplierData = {
    id: Number.parseInt(supplierId),
    name: "TechSupplies Inc.",
    contact: "John Smith",
    email: "john@techsupplies.com",
    phone: "+1 234 567 890",
    address: "123 Tech Street, Silicon Valley, CA",
    notes: "Proveedor principal de productos electrónicos",
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Editar Proveedor"
        text="Modifica la información del proveedor."
      />
      <div className="grid gap-8">
        <SupplierForm initialData={supplierData} isEditing={true} />
      </div>
    </DashboardShell>
  );
}
