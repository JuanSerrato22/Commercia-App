import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { IOrder } from "../api/types/IOrder";
import { Picker } from "@react-native-picker/picker";

interface Props {
  onSubmit: (order: IOrder) => void;
  initialData?: IOrder;
  buttonText?: string;
}

const OrderForm: React.FC<Props> = ({ onSubmit, initialData, buttonText = "Guardar" }) => {
  const [formData, setFormData] = useState<IOrder>({
    id_order: "",
    id_client: "",
    order_date: new Date().toISOString().split('T')[0],
    total_amount: "0",
    status: "1",
    delivery_address: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        order_date: initialData.order_date ? new Date(initialData.order_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      });
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!formData.id_client.trim()) {
      Alert.alert("Error", "Por favor ingrese el ID del cliente");
      return;
    }
    if (!formData.order_date.trim()) {
      Alert.alert("Error", "Por favor ingrese la fecha del pedido");
      return;
    }
    if (parseFloat(formData.total_amount) <= 0) {
      Alert.alert("Error", "Por favor ingrese un total válido");
      return;
    }
    if (!formData.delivery_address.trim()) {
      Alert.alert("Error", "Por favor ingrese la dirección de entrega");
      return;
    }
    onSubmit(formData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>ID Cliente *</Text>
      <TextInput
        style={styles.input}
        value={formData.id_client}
        onChangeText={(text) => setFormData({ ...formData, id_client: text })}
        placeholder="Ingrese el ID del cliente"
      />

      <Text style={styles.label}>Fecha *</Text>
      <TextInput
        style={styles.input}
        value={formData.order_date}
        onChangeText={(text) => setFormData({ ...formData, order_date: text })}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Total *</Text>
      <TextInput
        style={styles.input}
        value={formData.total_amount}
        onChangeText={(text) => {
          // Asegurar que solo se ingresen números válidos
          const numericValue = text.replace(/[^0-9.]/g, '');
          setFormData({ ...formData, total_amount: numericValue });
        }}
        placeholder="Ingrese el total del pedido"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Dirección de entrega *</Text>
      <TextInput
        style={styles.input}
        value={formData.delivery_address}
        onChangeText={(text) => setFormData({ ...formData, delivery_address: text })}
        placeholder="Ingrese la dirección de entrega"
        multiline
        numberOfLines={3}
      />

      <Text style={styles.label}>Estado</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value })}
          style={styles.picker}
        >
          <Picker.Item label="Activo" value="1" />
          <Picker.Item label="Inactivo" value="0" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrderForm;