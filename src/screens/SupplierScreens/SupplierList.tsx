import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SupplierStackParamList } from "../../navigations/types";
import { ISupplier } from "../../api/types/ISupplier";
import { getAllSupplier } from "../../api/services/SupplierServices";
import SupplierCard from "../../components/SupplierCard";
import AntDesign from "@expo/vector-icons/AntDesign";

const SupplierList: React.FC = () => {
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<SupplierStackParamList>>();

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const data = await getAllSupplier();
      setSuppliers(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los proveedores");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSuppliers();
    }, [])
  );

  const handleAddSupplier = () => {
    navigation.navigate("SupplierRegister");
  };

  const handleDeleteSupplier = () => {
    loadSuppliers(); // Recargar la lista después de eliminar
  };

  const renderItem = ({ item }: { item: ISupplier }) => (
    <SupplierCard data={item} onDelete={handleDeleteSupplier} />
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Cargando proveedores...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddSupplier}>
        <AntDesign name="plus" size={24} color="white" />
        <Text style={styles.addButtonText}>Agregar Proveedor</Text>
      </TouchableOpacity>

      {suppliers.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No hay proveedores registrados</Text>
        </View>
      ) : (
        <FlatList
          data={suppliers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_supplier}
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
    backgroundColor: "#007bff",
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

export default SupplierList;