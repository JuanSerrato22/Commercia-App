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
    id: "",
    cliente_id: "",
    fecha: new Date().toISOString().split('T')[0],
    total: "0",
    estado: "",
    direccion: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        fecha: initialData.fecha ? new Date(initialData.fecha).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      });
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!formData.id.trim()) {
      Alert.alert("Error", "Por favor ingrese el ID del cliente");
      return;
    }
    if (!formData.fecha.trim()) {
      Alert.alert("Error", "Por favor ingrese la fecha del pedido");
      return;
    }
    if (parseFloat(formData.total) <= 0) {
      Alert.alert("Error", "Por favor ingrese un total válido");
      return;
    }
    if (!formData.direccion.trim()) {
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
        value={formData.cliente_id}
        onChangeText={(text) => setFormData({ ...formData, cliente_id: text })}
        placeholder="Ingrese el ID del cliente"
      />

      <Text style={styles.label}>Fecha *</Text>
      <TextInput
        style={styles.input}
        value={formData.fecha}
        onChangeText={(text) => setFormData({ ...formData, fecha: text })}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Total *</Text>
      <TextInput
        style={styles.input}
        value={formData.total}
        onChangeText={(text) => {
          // Asegurar que solo se ingresen números válidos
          const numericValue = text.replace(/[^0-9.]/g, '');
          setFormData({ ...formData, total: numericValue });
        }}
        placeholder="Ingrese el total del pedido"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Dirección de entrega *</Text>
      <TextInput
        style={styles.input}
        value={formData.direccion}
        onChangeText={(text) => setFormData({ ...formData, direccion: text })}
        placeholder="Ingrese la dirección de entrega"
        multiline
        numberOfLines={3}
      />

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
    backgroundColor: "#143D60",
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