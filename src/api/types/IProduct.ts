export interface IProduct {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string;
  stock: string;
  categoria_id: string; // Relación con categoría
}