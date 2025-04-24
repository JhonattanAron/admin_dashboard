export type Product = {
  _id?: string;
  name?: string;
  options?: OptionItem[];
  price: number;
  discountPrice: number;
  porcentaje: number;
  cost?: number;
  stock?: number;
  category?: string;
  description?: string;
  supplier?: string;
  sku?: string;
  internacional: boolean;
  origen?: string;
  details?: string;
};

export type ProductInfoOrder = {
  productoId: string;
  cantidad: number;
  nombre: string;
  precio: number;
  imagen: string;
};

export interface OptionItem {
  name: string;
  image: string;
}
