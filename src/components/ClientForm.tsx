import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { IClient } from "../api/types/IClient";
import { Picker } from "@react-native-picker/picker";

interface Props {
  onSubmit: (client: IClient) => void;
  initialData?: IClient;
  buttonText?: string;
}

const ClientForm: React.FC<Props> = ({ onSubmit, initialData, buttonText = "Guardar" }) => {
  const [formData, setFormData] = useState<IClient>({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    activo: "1",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!formData.nombre.trim() || !formData.email.trim() || !formData.telefono.trim()) {
      Alert.alert("Error", "Por favor complete todos los campos obligatorios");
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert("Error", "Por favor ingrese un email válido");
      return;
    }

    onSubmit(formData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre *</Text>
      <TextInput
        style={styles.input}
        value={formData.nombre}
        onChangeText={(text) => setFormData({ ...formData, nombre: text })}
        placeholder="Ingrese el nombre del cliente"
      />

      <Text style={styles.label}>Email *</Text>
      <TextInput
        style={styles.input}
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        placeholder="Ingrese el email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Teléfono *</Text>
      <TextInput
        style={styles.input}
        value={formData.telefono}
        onChangeText={(text) => setFormData({ ...formData, telefono: text })}
        placeholder="Ingrese el teléfono"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Dirección</Text>
      <TextInput
        style={styles.input}
        value={formData.direccion}
        onChangeText={(text) => setFormData({ ...formData, direccion: text })}
        placeholder="Ingrese la dirección"
        multiline
      />

      <Text style={styles.label}>Estado</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.activo}
          onValueChange={(value) => setFormData({ ...formData, activo: value })}
          style={styles.picker}
        >
          <Picker.Item label="Activo" value="1" />
          <Picker.Item label="Inactivo" value="0" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ClientForm;