// screens/ProductRegisterScreen.tsx
import React, { useState } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProductStackParamList } from "../../navigations/types";
import { IProduct } from "../../api/types/IProduct";
import { createProduct } from "../../api/services/ProductServices";
import ProductForm from "../../components/ProductForm";

const ProductRegisterScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ProductStackParamList>>();

  const handleSubmit = async (productData: IProduct) => {
    try {
      setLoading(true);
      await createProduct(productData);
      Alert.alert(
        "Éxito",
        "Producto registrado correctamente",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar el producto");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProductForm onSubmit={handleSubmit} buttonText="Registrar Producto" />
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
});

export default ProductRegisterScreen;
