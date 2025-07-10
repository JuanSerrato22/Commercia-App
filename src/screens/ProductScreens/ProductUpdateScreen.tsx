// screens/ProductUpdateScreen.tsx
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ProductStackParamList } from "../../navigations/types";
import { IProduct } from "../../api/types/IProduct";
import { getByIdProduct, updateProduct } from "../../api/services/ProductServices";
import ProductForm from "../../components/ProductForm";

type ProductUpdateScreenRouteProp = RouteProp<ProductStackParamList, "ProductUpdate">;

const ProductUpdateScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<IProduct | undefined>(undefined);
  const navigation = useNavigation<NativeStackNavigationProp<ProductStackParamList>>();
  const route = useRoute<ProductUpdateScreenRouteProp>();

  const { id } = route.params;

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getByIdProduct(id);
      setInitialData(data);
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar el producto");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (productData: IProduct) => {
    try {
      setLoading(true);
      await updateProduct(id, productData);
      Alert.alert(
        "Éxito",
        "Producto actualizado correctamente",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el producto");
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
      <ProductForm
        onSubmit={handleSubmit}
        initialData={initialData}
        buttonText="Actualizar Producto"
      />
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

export default ProductUpdateScreen;
