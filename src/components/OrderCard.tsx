import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { IOrder } from "../api/types/IOrder";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OrderStackParamList } from "../navigations/types";
import { deleteOrder } from "../api/services/OrderServices";

interface Props {
  data: IOrder;
  onDelete?: () => void;
}

const OrderCard: React.FC<Props> = ({ data, onDelete }) => {
  const navigation = useNavigation<NativeStackNavigationProp<OrderStackParamList>>();

  const handleEdit = () => {
    navigation.navigate("OrderUpdate", { id: data.id_order });
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Está seguro que desea eliminar este pedido?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteOrder(data.id_order);
              onDelete?.();
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el pedido");
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: string) => {
    const numAmount = parseFloat(amount);
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(numAmount);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Pedido #{data.id_order}</Text>
      <Text style={styles.text}>Cliente: {data.id_client}</Text>
      <Text style={styles.text}>Fecha: {formatDate(data.order_date)}</Text>
      <Text style={styles.text}>Total: {formatCurrency(data.total_amount)}</Text>
      <Text style={styles.text}>Dirección: {data.delivery_address}</Text>
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

export default OrderCard;