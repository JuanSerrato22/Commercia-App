import React, { useState } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OrderStackParamList } from "../../navigations/types";
import { IOrder } from "../../api/types/IOrder";
import { createOrder } from "../../api/services/OrderServices";
import OrderForm from "../../components/OrderForm";

const OrderRegisterScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<OrderStackParamList>>();

  const handleSubmit = async (orderData: IOrder) => {
    try {
      setLoading(true);
      await createOrder(orderData);
      Alert.alert(
        "Éxito", 
        "Pedido registrado correctamente",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar el pedido");
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
      <OrderForm onSubmit={handleSubmit} buttonText="Registrar Pedido" />
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

export default OrderRegisterScreen;