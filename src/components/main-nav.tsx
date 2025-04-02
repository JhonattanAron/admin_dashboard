import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/dashboard" className="flex items-center space-x-2">
        <ShoppingBag className="h-6 w-6" />
        <span className="font-bold inline-block">Mi Tienda</span>
      </Link>
    </div>
  )
}

