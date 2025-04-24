import { ProductForm } from "@/components/productos/product-form";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";

export default function NewProductPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Producto Form"
        text="Añade o modifica un nuevo producto de tu tienda."
      />
      <div className="grid gap-8">
        <ProductForm />
      </div>
    </DashboardShell>
  );
}
