import { ORDER_END_POINT } from "../contants/Endpoint";
import { IOrder } from "../types/IOrder";


export const createOrder = async (register: IOrder) => {
  try {
    const response = await fetch(ORDER_END_POINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    });

    if (!response.ok) throw new Error("Error al crear el pedido");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllOrder = async () => {
  try {
    const response = await fetch(ORDER_END_POINT);
    if (!response.ok) throw new Error("Error al listar los pedidos");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getByIdOrder = async (id: string) => {
  try {
    const response = await fetch(ORDER_END_POINT + id);
    if (!response.ok) throw new Error("Error al obtener el pedido");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateOrder = async (id: string, register: IOrder) => {
  try {
    const response = await fetch(ORDER_END_POINT + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    });

    if (!response.ok) throw new Error("Error al actualizar el pedido");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const response = await fetch(ORDER_END_POINT + id, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error al eliminar el pedido");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};