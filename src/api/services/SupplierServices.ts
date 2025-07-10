import { SUPPLIER_END_POINT } from "../contants/Endpoint";
import { ISupplier } from "../types/ISupplier";

export const createSupplier = async (register: ISupplier) => {
  try {
    const response = await fetch(SUPPLIER_END_POINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    });

    if (!response.ok) throw new Error("Error al crear el proveedor");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllSupplier = async () => {
  try {
    const response = await fetch(SUPPLIER_END_POINT);
    if (!response.ok) throw new Error("Error al listar los proveedores");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getByIdSupplier = async (id: string) => {
  try {
    const response = await fetch(SUPPLIER_END_POINT + id);
    if (!response.ok) throw new Error("Error al obtener el proveedor");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateSupplier = async (id: string, register: ISupplier) => {
  try {
    const response = await fetch(SUPPLIER_END_POINT + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    });

    if (!response.ok) throw new Error("Error al actualizar el proveedor");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteSupplier = async (id: string) => {
  try {
    const response = await fetch(SUPPLIER_END_POINT + id, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error al eliminar el proveedor");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};