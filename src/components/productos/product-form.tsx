"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash } from "lucide-react";
import { useProductStore } from "@/store/ProductStore";
import { showToast } from "../toast/ToastSuccesAndError";
import { useRouter } from "next/navigation";

export function ProductForm() {
  const router = useRouter();
  const [sku, setSku] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const [category, setCategory] = useState<string>(""); // Estado para categoría
  const [supplier, setSupplier] = useState<string>(""); // Estado para proveedor
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    cost: "",
    stock: "",
    sku: "",
  });

  const { addProduct } = useProductStore();
  const generarSKU = () => {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeros = "0123456789";

    // Crear una cadena aleatoria para el SKU
    let skuGenerado = "SKU-";
    for (let i = 0; i < 4; i++) {
      skuGenerado += letras.charAt(Math.floor(Math.random() * letras.length)); // Letras aleatorias
    }
    for (let i = 0; i < 4; i++) {
      skuGenerado += numeros.charAt(Math.floor(Math.random() * numeros.length)); // Números aleatorios
    }

    setSku(skuGenerado); // Establecer el SKU generado
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const addFunction = await addProduct({
        name: formData.name,
        images: imageUrls,
        price: Number(formData.price),
        stock: formData.stock,
        category: category,
        description: formData.description,
        supplier: supplier,
        sku: formData.sku,
      });
      console.log(await addFunction);
      setTimeout(() => {
        setIsLoading(false);
        showToast("Exito al Agregar el Producto", "success");
      }, 1000);
    } catch (error) {
      console.error("Error con el servidor:", error);
      setIsLoading(false);
      showToast(
        "No se Agrego el Producto Verifica que no tenga el nombre de un Prodcuto Existente",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const addImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageField = (index: number) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Información General</TabsTrigger>
          <TabsTrigger value="inventory">Inventario</TabsTrigger>
          <TabsTrigger value="media">Imágenes</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
              <CardDescription>
                Ingresa la información básica del producto.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Producto</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nombre del producto"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Descripción del producto"
                  className="min-h-[100px]"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={category}
                    onValueChange={(value) => setCategory(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electrónica</SelectItem>
                      <SelectItem value="clothing">Ropa</SelectItem>
                      <SelectItem value="home">Hogar</SelectItem>
                      <SelectItem value="sports">Deportes</SelectItem>
                      <SelectItem value="toys">Juguetes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier">Proveedor</Label>
                  <Select
                    value={supplier}
                    onValueChange={(value) => setSupplier(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="techsupplies">
                        TechSupplies Inc.
                      </SelectItem>
                      <SelectItem value="audiotech">AudioTech</SelectItem>
                      <SelectItem value="weartech">WearTech</SelectItem>
                      <SelectItem value="photopro">PhotoPro</SelectItem>
                      <SelectItem value="homegoods">HomeGoods</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventario y Precios</CardTitle>
              <CardDescription>
                Gestiona el inventario y los precios del producto.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Precio ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Costo ($)</Label>
                  <Input
                    id="cost"
                    name="cost"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    value={formData.cost}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="sku"
                      name="sku"
                      placeholder="SKU-12345"
                      contentEditable="false"
                      value={sku}
                      onChange={handleInputChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generarSKU}
                      className="w-30"
                    >
                      Generar SKU
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Imágenes</CardTitle>
              <CardDescription>
                Ingresa URLs de imágenes para el producto.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`image-url-${index}`}>
                      URL de imagen {index + 1}
                    </Label>
                    <Input
                      id={`image-url-${index}`}
                      value={url}
                      onChange={(e) =>
                        handleImageUrlChange(index, e.target.value)
                      }
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>
                  {imageUrls.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="mt-6"
                      onClick={() => removeImageField(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addImageField}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar otra imagen
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-6 flex justify-end space-x-4">
        <Button
          variant="outline"
          type="button"
          onClick={() => router.push("/dashboard/productos")}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar Producto"}
        </Button>
      </div>
    </form>
  );
}
