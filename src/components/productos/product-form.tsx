"use client";

import type React from "react";
import { useEffect, useState } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { OptionItem, Product } from "@/store/Interfaces";
import { RichTextEditor } from "../rich-text-editor";
import { useCategoriasStore } from "@/store/categoryStore";

export function ProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [internacional, setInternacional] = useState(false); // Valor inicial (false)
  const [origen, setOrigen] = useState("usa"); // Valor inicial ('usa')
  const { categorias, fetchCategorias } = useCategoriasStore();

  const [sku, setSku] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [optionItems, setOptionItems] = useState<OptionItem[]>([]);
  const [category, setCategory] = useState<string>(""); // Estado para categoría
  const [supplier, setSupplier] = useState<string>("");
  const [isEdit, setIsEdit] = useState(false);
  const [details, setDetails] = useState("");
  const [description, setDescription] = useState("");

  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    sku: "",
    stock: 0,
    options: [],
    price: 0,
    discountPrice: 0,
    porcentaje: 0,
    internacional: false,
  });
  useEffect(() => {
    const getData = async () => {
      const data = await searchParams.get("data");
      await fetchCategorias();
      if (data) {
        setIsEdit(true);
        try {
          const parsed = JSON.parse(data);
          setFormData(parsed);
          setSku(parsed.sku);
          setOptionItems(parsed.options);
          setCategory(parsed.category);
          setSupplier(parsed.supplier);
          setDescription(parsed.description);
          setDetails(parsed.details);
          setInternacional(parsed.internacional);
          setOrigen(parsed.origen);
        } catch (err) {
          console.error("Error al parsear data:", err);
        }
      } else {
        console.log("No hay data en los parámetros");
      }
    };
    getData();
  }, [searchParams]);

  const { addProduct, editProduct } = useProductStore();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEdit) {
        const id = searchParams.get("id");
        if (!id) {
          return;
        }
        await editProduct(id, {
          ...formData,
          options: optionItems,
          category: category,
          supplier: supplier,
          description: description,
          sku: sku,
          internacional: internacional,
          details: details,
          origen: origen,
        });
      } else {
        await addProduct({
          ...formData,
          options: optionItems,
          category: category,
          supplier: supplier,
          description: description,
          sku: sku,
          internacional: internacional,
          details: details,
          origen: origen,
        });
      }
      setIsLoading(false);
      showToast("Exito al Agregar el Producto", "success");
      router.push("/dashboard/productos");
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

  const addOptionFiel = () => {
    setOptionItems([
      ...optionItems,
      {
        name: "",
        image: "",
      },
    ]);
  };

  const removeImageField = (index: number) => {
    const optionItem = [...optionItems];
    optionItem.splice(index, 1);
    setOptionItems(optionItem);
  };

  const handleImageUrlChange = (index: number, value: OptionItem) => {
    const optionItem = [...optionItems];
    optionItem[index] = value;
    setOptionItems(optionItem);
  };

  useEffect(() => {
    if (formData.price > 0 && formData.discountPrice >= 0) {
      const porcentajeDescuento =
        ((formData.price - formData.discountPrice) / formData.price) * 100;

      setFormData((prev) => ({
        ...prev,
        porcentaje: +porcentajeDescuento.toFixed(2),
      }));
    } else {
      setFormData((prev) => ({ ...prev, porcentaje: 0 }));
    }
  }, [formData.discountPrice, formData.price]);

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Información General</TabsTrigger>
          <TabsTrigger value="detalles">Detalles</TabsTrigger>
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
                      {categorias.map((categorias) => (
                        <SelectItem
                          key={categorias._id}
                          value={categorias.name}
                        >
                          {categorias.name}
                        </SelectItem>
                      ))}
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
                <div className="space-y-2 flex flex-col">
                  <Label>¿Producto internacional?</Label>
                  <button
                    type="button"
                    onClick={() =>
                      setInternacional(internacional ? false : true)
                    }
                    className={`px-4 py-2 rounded-lg w-12 ${
                      internacional ? "bg-green-500" : "bg-gray-400"
                    } text-white`}
                  >
                    {internacional ? "Sí" : "No"}
                  </button>
                </div>
                {internacional && (
                  <div className="space-y-2">
                    <Label>Origen del producto:</Label>
                    <Select
                      value={origen}
                      onValueChange={(value) => setOrigen(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar origen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usa">USA</SelectItem>
                        <SelectItem value="china">China</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
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
                <div className=" space-y-2">
                  <Label htmlFor="price">Precio Normal ($)</Label>
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
                  <Label htmlFor="discountPrice">Precio Descuento ($)</Label>
                  <Input
                    id="discountPrice"
                    name="discountPrice"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    value={formData.discountPrice}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountPrice">
                    Porcentaje Descuento (%)
                  </Label>
                  <Input
                    id="porcentaje"
                    name="porcentaje"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    readOnly
                    value={formData.porcentaje?.toFixed(2) ?? "0.00"}
                    className="pr-8" // para dar espacio al símbolo %
                  />
                </div>
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
                      disabled={isEdit}
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
        <TabsContent value="detalles">
          <Card>
            <CardHeader>
              <CardTitle>Detalles Del Producto</CardTitle>
              <CardDescription>
                Ingresa la Descripción y Detalles del producto.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <RichTextEditor
                  value={description}
                  onValueChange={setDescription}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Especificaciones</Label>
                <RichTextEditor value={details} onValueChange={setDetails} />
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
              {optionItems.map(({ name, image }, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`image-name-${index}`}>
                      Nombre de la Opción {index + 1}
                    </Label>
                    <Input
                      id={`image-name-${index}`}
                      name="optionName"
                      placeholder="Nombre de la opción"
                      value={name}
                      onChange={(e) =>
                        handleImageUrlChange(index, {
                          name: e.target.value,
                          image,
                        })
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`image-url-${index}`}>
                      URL de la Imagen
                    </Label>
                    <Input
                      id={`image-url-${index}`}
                      name="optionImage"
                      placeholder="https://example.com/image.jpg"
                      value={image}
                      onChange={(e) =>
                        handleImageUrlChange(index, {
                          name,
                          image: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeImageField(index)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addOptionFiel}>
                <Plus className="w-4 h-4 mr-2" /> Agregar Opción
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
