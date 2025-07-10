// screens/SupplierUpdateScreen.tsx
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { SupplierStackParamList } from "../../navigations/types";
import { ISupplier } from "../../api/types/ISupplier";
import { getByIdSupplier, updateSupplier } from "../../api/services/SupplierServices";
import SupplierForm from "../../components/SupplierForm";

type SupplierUpdateScreenRouteProp = RouteProp<SupplierStackParamList, "SupplierUpdate">;

const SupplierUpdateScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<ISupplier | undefined>(undefined);
  const navigation = useNavigation<NativeStackNavigationProp<SupplierStackParamList>>();
  const route = useRoute<SupplierUpdateScreenRouteProp>();

  const { id } = route.params;

  useEffect(() => {
    loadSupplier();
  }, [id]);

  const loadSupplier = async () => {
    try {
      setLoading(true);
      const data = await getByIdSupplier(id);
      setInitialData(data);
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar el proveedor");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (supplierData: ISupplier) => {
    try {
      setLoading(true);
      await updateSupplier(id, supplierData);
      Alert.alert(
        "Éxito", 
        "Proveedor actualizado correctamente",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el proveedor");
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
      <SupplierForm 
        onSubmit={handleSubmit} 
        initialData={initialData}
        buttonText="Actualizar Proveedor" 
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

export default SupplierUpdateScreen;