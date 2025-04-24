"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import { EmojiInput } from "@/components/emoji-picker";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { showToast } from "@/components/toast/ToastSuccesAndError";

import { Categoria, useCategoriasStore } from "@/store/categoryStore";
export default function CategoriesPage() {
  // Estado para las categorías
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Categoria>({
    name: "",
    icon: "",
  });

  // Estado para el diálogo de creación/edición
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {
    createCategoria,
    categorias,
    updateCategoria,
    deleteCategoria,
    fetchCategorias,
  } = useCategoriasStore();

  // Estado para el diálogo de confirmación de eliminación
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getCategories = async () => {
      await fetchCategorias();
      setLoading(false);
    };
    getCategories();
  }, []);

  // Filtrar categorías según la búsqueda
  const filteredCategories = categorias.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Funciones para manejar CRUD
  const handleCreateCategory = () => {
    setIsEditing(false);
    setFormData({ name: "", icon: "🏷️" });
    setDialogOpen(true);
  };

  const handleEditCategory = (category: Categoria) => {
    console.log(formData);
    setIsEditing(true);
    setFormData(category);
    setDialogOpen(true);
  };

  const handleDeleteCategory = (id: string) => {
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (categoryToDelete !== null) {
      try {
        setIsSubmitting(true);
        await deleteCategoria(categoryToDelete);
        showToast("Categoría eliminada correctamente", "success");
        await fetchCategorias();
      } catch (error) {
        showToast("Error al eliminar la categoría", "error");
        console.error(error);
      } finally {
        setIsSubmitting(false);
        setDeleteDialogOpen(false);
        setCategoryToDelete(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    if (formData.name === "") {
      showToast("Campo nombre Obligatorio", "error");
    }
    try {
      setIsSubmitting(true);

      if (isEditing && formData._id) {
        await updateCategoria(formData._id, formData);
        showToast("Categoría actualizada correctamente", "success");
      } else {
        await createCategoria(formData);
        showToast("Categoría creada correctamente", "success");
      }

      await fetchCategorias();
      setDialogOpen(false);
    } catch (error) {
      showToast(
        `Error: ${error instanceof Error ? error.message : "Desconocido"}`,
        "error"
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Categorías</h1>
        <Button onClick={handleCreateCategory}>
          <Plus className="mr-2 h-4 w-4" /> Nueva Categoría
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar categorías..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Cargando categorías...</span>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Icono</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No se encontraron categorías
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategories.map((category, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-md text-2xl">
                        {category.icon}
                      </div>
                    </TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCategory(category._id || "")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Diálogo para crear/editar categoría */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => !isSubmitting && setDialogOpen(open)}
      >
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Editar Categoría" : "Crear Nueva Categoría"}
              </DialogTitle>
              <DialogDescription>
                Complete los campos para{" "}
                {isEditing ? "actualizar la" : "crear una nueva"} categoría.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="col-span-3"
                  placeholder="Nombre de la categoría"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="icon" className="text-right">
                  Icono
                </Label>
                <div className="col-span-3">
                  <EmojiInput
                    value={formData.icon || "🏷️"}
                    onChange={(emoji) =>
                      setFormData((prev) => ({
                        ...prev,
                        icon: emoji,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditing ? "Actualizando..." : "Creando..."}
                  </>
                ) : isEditing ? (
                  "Actualizar"
                ) : (
                  "Crear"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar */}
      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => !isSubmitting && setDeleteDialogOpen(open)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              la categoría seleccionada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Eliminando...
                </>
              ) : (
                "Eliminar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
