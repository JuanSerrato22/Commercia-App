import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable, ScrollView, RefreshControl } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { ProducttackParamsList } from "../navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getAllProduct } from "../api/services/ProductServices";
import { IProduct } from "../api/types/IProduct";
import BookCard from "../components/ProductCard";

type ProductScreenNavigationProp = NativeStackNavigationProp<
  ProducttackParamsList,
  "ProductList"
>;

const ProductList: React.FC = () => {
  /*
   useEffect es un hook de React que te permite ejecutar lógica secundaria (efectos) 
  después de que el componente se renderiza. Es útil para:
  */
  useEffect(() => {
    fetchProducts();
  }, []);
  //leer: https://react.dev/reference/react/useEffect
  /*
  useEffect es un hook de React que te permite ejecutar lógica secundaria (efectos) 
  después de que el componente se renderiza. Es útil para:

Llamar APIs

Suscribirse a eventos

Iniciar intervalos o temporizadores

Manipular el DOM (en React web)

Cualquier acción que no deba ejecutarse en cada render
  */
  //   useFocusEffect(
  //   useCallback(() => {
  //     const intervalId = setInterval(() => {
  //       fetchBooks();
  //     }, 10000);

  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   }, [])
  // );
  //se crea el objeto que almacena la lista de productos y configura
  //la actualización de lista cuando se consulta
  const [products, setProducts] = useState<IProduct[]>([]);
  //configuración para generar el refesh haciendo scroll hacia abajo
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  }, []);

  //método que solicita la información de los productos y actualiza el objeto de productos
  const fetchProducts = async () => {
    try {
      const data = await getAllProduct();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };
  const navigation = useNavigation<ProductScreenNavigationProp>();
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Pressable
        onPress={() => navigation.navigate("ProductRegister")}>
        <Text>Add Product</Text>
      </Pressable>
      {products.length === 0 ? (
        <View style={styles.center}>
          <Text>No hay productos disponibles.</Text>
        </View>
      ) : (
        products.map((product) => <BookCard key={product.id_product} data={product} />)
      )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  touch: {
    margin: 5,
    backgroundColor: "#1e90ff", // azul tipo botón
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // sombra en Android
    width: 150,
  },
});

export default ProductList;
