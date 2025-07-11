export interface IProduct {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: {
    id: number;
  };
}