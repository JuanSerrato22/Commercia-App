// screens/SupplierRegisterScreen.tsx
import React, { useState } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SupplierStackParamList } from "../../navigations/types";
import { ISupplier } from "../../api/types/ISupplier";
import { createSupplier } from "../../api/services/SupplierServices";
import SupplierForm from "../../components/SupplierForm";

const SupplierRegisterScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<SupplierStackParamList>>();

  const handleSubmit = async (supplierData: ISupplier) => {
    try {
      setLoading(true);
      await createSupplier(supplierData);
      Alert.alert(
        "Éxito", 
        "Proveedor registrado correctamente",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar el proveedor");
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
      <SupplierForm onSubmit={handleSubmit} buttonText="Registrar Proveedor" />
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

export default SupplierRegisterScreen;