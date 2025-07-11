import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProductStackParamList } from "../../navigations/types";
import { IProduct } from "../../api/types/IProduct";
import { getAllProduct } from "../../api/services/ProductServices";
import { deleteProduct } from "../../api/services/ProductServices";
import ProductCard from "../../components/ProductCard";
import AntDesign from "@expo/vector-icons/AntDesign";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<ProductStackParamList>>();

const loadProducts = async () => {
  try {
    setLoading(true);
    const data = await getAllProduct();
    console.log("📦 Productos recibidos:", data); // 👈 Agregado
    setProducts(data);
  } catch (error) {
    Alert.alert("Error", "No se pudieron cargar los productos");
  } finally {
    setLoading(false);
  }
};

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  const handleAddProduct = () => {
    navigation.navigate("ProductRegister");
  };

  const handleDeleteProduct = (id: string) => {
  Alert.alert(
    "Confirmar eliminación",
    "¿Estás seguro de que deseas eliminar este producto?",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteProduct(id);

            // ⛔ Ya no llames a loadProducts aquí
            // ✅ En su lugar, elimina el producto del estado actual
            setProducts((prev) => prev.filter((p) => p.id !== id));

            Alert.alert("Éxito", "Producto eliminado correctamente");
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el producto");
          }
        },
      },
    ]
  );
};


  const renderItem = ({ item }: { item: IProduct }) => (
  <ProductCard
    data={item}
    onDelete={() => handleDeleteProduct(item.id)} // ✅ Aquí se pasa el id
  />
);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <AntDesign name="plus" size={24} color="white" />
        <Text style={styles.addButtonText}>Agregar Producto</Text>
      </TouchableOpacity>

      {products.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No hay productos registrados</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#143D60",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  listContainer: {
    paddingBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default ProductList;