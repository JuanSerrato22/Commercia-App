// screens/OrderUpdateScreen.tsx
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { OrderStackParamList } from "../../navigations/types";
import { IOrder } from "../../api/types/IOrder";
import { getByIdOrder, updateOrder } from "../../api/services/OrderServices";
import OrderForm from "../../components/OrderForm";

type OrderUpdateScreenRouteProp = RouteProp<OrderStackParamList, "OrderUpdate">;

const OrderUpdateScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<IOrder | undefined>(undefined);
  const navigation = useNavigation<NativeStackNavigationProp<OrderStackParamList>>();
  const route = useRoute<OrderUpdateScreenRouteProp>();

  const { id } = route.params;

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const data = await getByIdOrder(id);
      setInitialData(data);
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar el pedido");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (orderData: IOrder) => {
    try {
      setLoading(true);
      await updateOrder(id, orderData);
      Alert.alert(
        "Éxito", 
        "Pedido actualizado correctamente",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el pedido");
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
      <OrderForm 
        onSubmit={handleSubmit} 
        initialData={initialData}
        buttonText="Actualizar Pedido" 
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

export default OrderUpdateScreen;