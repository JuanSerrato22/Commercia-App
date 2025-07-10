import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { IProduct } from "../api/types/IProduct";
import { createProduct } from "../api/services/ProductServices";
import ProductForm from "../components/ProductForm";

const ProductRegisterScreen = () => {
  const [form, setForm] = useState<IProduct>({
    id_product: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    status: "",
  });
  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };
  const registerProduct = async () => {
    const register = await createProduct(form);
  };
  return (
    <View>
      <ProductForm form={form} handleChange={handleChange} />
      <Button title="Guardar" onPress={registerProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    textAlign: "center",
  },
});

export default ProductRegisterScreen;