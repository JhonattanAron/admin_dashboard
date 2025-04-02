import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { SuppliersTable } from "@/components/suppliers-table";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import Link from "next/link";

export default function SuppliersPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Proveedores"
        text="Gestiona los proveedores de tu tienda."
      >
        <Link href="/dashboard/proveedores/nuevo">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Proveedor
          </Button>
        </Link>
      </DashboardHeader>
      <div>
        <SuppliersTable />
      </div>
    </DashboardShell>
  );
}
