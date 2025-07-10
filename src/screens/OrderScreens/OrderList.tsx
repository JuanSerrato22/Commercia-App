import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OrderStackParamList } from "../../navigations/types";
import { IOrder } from "../../api/types/IOrder";
import { getAllOrder } from "../../api/services/OrderServices";
import OrderCard from "../../components/OrderCard";
import AntDesign from "@expo/vector-icons/AntDesign";

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<OrderStackParamList>>();

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrder();
      setOrders(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los pedidos");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [])
  );

  const handleAddOrder = () => {
    navigation.navigate("OrderRegister");
  };

  const handleDeleteOrder = () => {
    loadOrders(); // Recargar la lista después de eliminar
  };

  const renderItem = ({ item }: { item: IOrder }) => (
    <OrderCard data={item} onDelete={handleDeleteOrder} />
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Cargando pedidos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddOrder}>
        <AntDesign name="plus" size={24} color="white" />
        <Text style={styles.addButtonText}>Agregar Pedido</Text>
      </TouchableOpacity>

      {orders.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No hay pedidos registrados</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_order}
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

export default OrderList;