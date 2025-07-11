import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { IClient } from "../api/types/IClient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ClientStackParamList } from "../navigations/types";
import { deleteClient } from "../api/services/ClientServices";

interface Props {
  data: IClient;
  onDelete?: () => void;
}

const ClientCard: React.FC<Props> = ({ data, onDelete }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();

  const handleEdit = () => {
    navigation.navigate("ClientUpdate", { id: data.id });
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Está seguro que desea eliminar este cliente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteClient(data.id);
              onDelete?.();
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el cliente");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{data.nombre}</Text>
      <Text style={styles.text}>Email: {data.email}</Text>
      <Text style={styles.text}>Teléfono: {data.telefono}</Text>
      <Text style={styles.text}>Dirección: {data.direccion}</Text>
      <Text style={[styles.text, { color: data.activo === "1" ? "green" : "red" }]}>
        Estado: {data.activo === "1" ? "Activo" : "Inactivo"}
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
    backgroundColor: "#143D60",
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

export default ClientCard;