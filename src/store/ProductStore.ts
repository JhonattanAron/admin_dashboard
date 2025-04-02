import { create } from "zustand";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  stock: string;
  category: string;
  description: string;
  supplier: string;
  sku: string;
};

type ProductStore = {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  editProduct: (id: string, updatedProduct: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  fetchProducts: () => Promise<void>;
};

const API_URL = "http://localhost:8080";

export const useProductStore = create<ProductStore>((set) => ({
  products: [],

  fetchProducts: async () => {
    const res = await fetch(`${API_URL}/productos`);
    const data = await res.json();
    set({ products: data });
  },

  addProduct: async (product) => {
    const res = await fetch(`${API_URL}/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al Agregar el producto");
    }

    const newProduct = await res.json();
    set((state) => ({ products: [...state.products, newProduct] }));
  },

  editProduct: async (id, updatedProduct) => {
    await fetch(`${API_URL}/productos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updatedProduct } : p
      ),
    }));
  },

  deleteProduct: async (id) => {
    await fetch(`${API_URL}/productos/${id}`, { method: "DELETE" });
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },
}));
