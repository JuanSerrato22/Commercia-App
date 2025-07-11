import { CLIENT_END_POINT } from "../contants/Endpoint";
import { IClient } from "../types/IClient";


export const createClient = async (register: IClient) => {
  try {
    const response = await fetch(CLIENT_END_POINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    });

    if (!response.ok) throw new Error("Error al crear el cliente");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllClient = async () => {
  try {
    const response = await fetch(CLIENT_END_POINT);
    if (!response.ok) throw new Error("Error al listar los clientes");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const getByIdClient = async (id: string) => {
  try {
    const response = await fetch(CLIENT_END_POINT + id);
    if (!response.ok) throw new Error("Error al obtener el cliente");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateClient = async (id: string, register: IClient) => {
  try {
    const response = await fetch(CLIENT_END_POINT + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    });

    if (!response.ok) throw new Error("Error al actualizar el cliente");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteClient = async (id: string) => {
  try {
    const response = await fetch(CLIENT_END_POINT + id, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error al eliminar el cliente");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};