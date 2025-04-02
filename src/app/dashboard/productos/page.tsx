import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ProductsTable } from "@/components/productos/products-table";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import Link from "next/link";
import { SearchBar } from "@/components/productos/SearchBar";

export default function ProductsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Productos"
        text="Gestiona los productos de tu tienda."
      >
        <Link href="/dashboard/productos/nuevo">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Button>
        </Link>
      </DashboardHeader>
      <div>
        <div className="mb-5">
          <SearchBar />
        </div>
        <div>
          <ProductsTable />
        </div>
      </div>
    </DashboardShell>
  );
}
