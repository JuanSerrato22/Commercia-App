export interface IProduct {
  id_product: string;
  name: string;
  description: string;
  price: string;
  stock: string;
  status: string;
  id_category: string; // Relación con categoría
}