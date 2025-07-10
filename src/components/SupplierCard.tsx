import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ISupplier } from "../api/types/ISupplier";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SupplierStackParamList } from "../navigations/types";
import { deleteSupplier } from "../api/services/SupplierServices";

interface Props {
  data: ISupplier;
  onDelete?: () => void;
}

const SupplierCard: React.FC<Props> = ({ data, onDelete }) => {
  const navigation = useNavigation<NativeStackNavigationProp<SupplierStackParamList>>();

  const handleEdit = () => {
    navigation.navigate("SupplierUpdate", { id: data.id_supplier });
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Está seguro que desea eliminar este proveedor?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteSupplier(data.id_supplier);
              onDelete?.();
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el proveedor");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.text}>Teléfono: {data.phone}</Text>
      <Text style={styles.text}>Email: {data.email}</Text>
      <Text style={styles.text}>Dirección: {data.address}</Text>
      <Text style={[styles.text, { color: data.status === "1" ? "green" : "red" }]}>
        Estado: {data.status === "1" ? "Activo" : "Inactivo"}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonEdit} onPress={handleEdit}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    margin: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  text: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },
  buttonEdit: {
    backgroundColor: "#1e90ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonDelete: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SupplierCard;