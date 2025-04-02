/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useProductStore } from "@/store/ProductStore";

function getStockStatus(stock: number) {
  if (stock === 0) {
    return { text: "Agotado", className: "bg-red-500" };
  } else if (stock < 5) {
    return { text: "Bajo stock", className: "bg-yellow-500" };
  } else {
    return { text: "En stock", className: "bg-green-500" };
  }
}

export function ProductsTable() {
  const searchParams = useSearchParams();
  const { products, total, pageSize, isLoading, fetchProducts } =
    useProductStore();

  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    fetchProducts(page, pageSize, searchTerm);
  }, [page, pageSize, searchTerm]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) {
    return <>Cargando....</>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Proveedor</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No se encontraron productos.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product, index) => (
                <TableRow key={product.id || index}>
                  <TableCell>
                    <Image
                      src={
                        (product.images && product.images[0]) ||
                        "/placeholder.svg"
                      }
                      alt={product.name || "Producto sin nombre"}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    {(() => {
                      const { text, className } = getStockStatus(
                        Number(product.stock) || 0
                      );
                      return <Badge className={className}>{text}</Badge>;
                    })()}
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.supplier}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          onClick={() => handlePageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </Button>
        <span>
          Página {page} de {Math.ceil(total / pageSize)}
        </span>
        <Button
          variant="outline"
          onClick={() =>
            handlePageChange(page * pageSize < total ? page + 1 : page)
          }
          disabled={page * pageSize >= total}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
