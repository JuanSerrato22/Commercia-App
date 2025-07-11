import { CATEGORY_END_POINT } from "../contants/Endpoint";
import { ICategory } from "../types/ICategory";


export const createCategory = async (register: ICategory) => {
  try {
    const response = await fetch(CATEGORY_END_POINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    });

    if (!response.ok) throw new Error("Error al crear la categoría");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllCategory = async () => {
  try {
    const response = await fetch(CATEGORY_END_POINT);
    if (!response.ok) throw new Error("Error al listar las categorías");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getByIdCategory = async (id: string) => {
  try {
    const response = await fetch(CATEGORY_END_POINT + id);
    if (!response.ok) throw new Error("Error al obtener la categoría");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateCategory = async (id: string, register: ICategory) => {
  try {
    const response = await fetch(CATEGORY_END_POINT + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    });

    if (!response.ok) throw new Error("Error al actualizar la categoría");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const response = await fetch(CATEGORY_END_POINT + id, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error al eliminar la categoría");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};