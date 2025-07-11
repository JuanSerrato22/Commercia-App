import { PRODUCT_END_POINT } from "../contants/Endpoint";
import {IProduct} from "../types/IProduct"


export const createProduct = async (register: IProduct) => {
  try {
    const response = await fetch(PRODUCT_END_POINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    });

    if (!response.ok) throw new Error("Error al crear el producto");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllProduct = async () => {
  try {
    const response = await fetch(PRODUCT_END_POINT);
    if (!response.ok) throw new Error("Error al listar los productos");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getByIdProduct = async (id: string) => {
  try {
    const response = await fetch(`${PRODUCT_END_POINT}/${id}`);

    if (!response.ok) throw new Error("Error al obtener el producto");

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw error;
  }
};


export const updateProduct = async (id: string, product: IProduct) => {
  try {
    const response = await fetch(`${PRODUCT_END_POINT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) throw new Error("Error al actualizar el producto");
    return await response.json();
  } catch (error) {
    console.error("Error en updateProduct:", error);
    throw error;
  }
};


export const deleteProduct = async (id: string) => {
  try {
    const response = await fetch(`${PRODUCT_END_POINT}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error al eliminar el producto");

    console.log("✅ Producto eliminado con éxito");
    return true;
  } catch (error) {
    console.error("Error en deleteProduct:", error);
    throw error;
  }
};