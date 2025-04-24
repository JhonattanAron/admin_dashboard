import { create } from "zustand";

export interface Categoria {
  _id?: string;
  name: string;
  icon: string;
}

interface CategoriasState {
  categorias: Categoria[];
  loading: boolean;
  error: string | null;

  fetchCategorias: () => Promise<void>;
  getCategoria: (id: string) => Promise<Categoria | null>;
  createCategoria: (data: Partial<Categoria>) => Promise<void>;
  updateCategoria: (id: string, data: Partial<Categoria>) => Promise<void>;
  deleteCategoria: (id: string) => Promise<void>;
}

const API_URL = "http://localhost:8080/categorias";

export const useCategoriasStore = create<CategoriasState>((set, get) => ({
  categorias: [],
  loading: false,
  error: null,

  fetchCategorias: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      set({ categorias: data });
    } catch {
      set({ error: "Error al cargar las categorías" });
    } finally {
      set({ loading: false });
    }
  },

  getCategoria: async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  createCategoria: async (data) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      await get().fetchCategorias();
    } catch {
      set({ error: "Error al crear categoría" });
    }
  },

  updateCategoria: async (id, data) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      await get().fetchCategorias();
    } catch {
      set({ error: "Error al actualizar categoría" });
    }
  },

  deleteCategoria: async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      await get().fetchCategorias();
    } catch {
      set({ error: "Error al eliminar categoría" });
    }
  },
}));
