import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ProducttackParamsList } from "../navigations/types";
import { getByIdProduct, updateProduct } from "../api/services/ProductServices";
import { IProduct } from "../api/types/IProduct";
import BookForm from "../components/ProductForm";

type DetailsRouteProp = RouteProp<ProducttackParamsList, "ProductUpdate">;

export default function ProductUpdateScreen () {
  const [form, setForm] = useState<IProduct>({
    id_product: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    status: "",
  });
  const route = useRoute<DetailsRouteProp>();
  const { id } = route.params;
  useEffect(() => {
    const fetchData = async () => {
      const response = await getByIdProduct(Number(id));
      setForm(response);
    };

    fetchData();
  }, []);
  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };
  const requestUpdateProduct = async () => {
    const register = await updateProduct(Number(id), form);
  };

  return (
    <View>
      <BookForm form={form} handleChange={handleChange} />
      <Button title="Guardar" onPress={requestUpdateProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    textAlign: "center",
  },
});
