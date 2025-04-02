"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, ShoppingCart, Package, Users, TruckIcon, DollarSign, BarChart } from "lucide-react"

export function SidebarNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      title: "Dashboard",
    },
    {
      href: "/dashboard/pedidos",
      icon: ShoppingCart,
      title: "Pedidos",
    },
    {
      href: "/dashboard/productos",
      icon: Package,
      title: "Productos",
    },
    {
      href: "/dashboard/clientes",
      icon: Users,
      title: "Clientes",
    },
    {
      href: "/dashboard/proveedores",
      icon: TruckIcon,
      title: "Proveedores",
    },
    {
      href: "/dashboard/gastos",
      icon: DollarSign,
      title: "Gastos",
    },
    {
      href: "/dashboard/reportes",
      icon: BarChart,
      title: "Reportes",
    },
  ]

  return (
    <nav className="flex flex-col space-y-1">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium",
            pathname === route.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
          )}
        >
          <route.icon className="mr-2 h-4 w-4" />
          <span>{route.title}</span>
        </Link>
      ))}
    </nav>
  )
}

