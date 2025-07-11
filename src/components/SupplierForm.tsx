import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { ISupplier } from "../api/types/ISupplier";
import { Picker } from "@react-native-picker/picker";

interface Props {
  onSubmit: (supplier: ISupplier) => void;
  initialData?: ISupplier;
  buttonText?: string;
}

const SupplierForm: React.FC<Props> = ({ onSubmit, initialData, buttonText = "Guardar" }) => {
  const [formData, setFormData] = useState<ISupplier>({
  id_supplier: "",
  name: "",
  contact_person: "",
  email: "",
  phone: "",
  address: "",
  status: "1",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      Alert.alert("Error", "Por favor ingrese el nombre del proveedor");
      return;
    }
    if (!formData.phone.trim()) {
      Alert.alert("Error", "Por favor ingrese el teléfono del proveedor");
      return;
    }
    if (!formData.email.trim()) {
      Alert.alert("Error", "Por favor ingrese el email del proveedor");
      return;
    }
    if (!formData.address.trim()) {
      Alert.alert("Error", "Por favor ingrese la dirección del proveedor");
      return;
    }
    onSubmit(formData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nombre *</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        placeholder="Ingrese el nombre del proveedor"
      />

      <Text style={styles.label}>Teléfono *</Text>
      <TextInput
        style={styles.input}
        value={formData.phone}
        onChangeText={(text) => setFormData({ ...formData, phone: text })}
        placeholder="Ingrese el teléfono"
        keyboardType="phone-pad"
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

      <Text style={styles.label}>Dirección *</Text>
      <TextInput
        style={styles.input}
        value={formData.address}
        onChangeText={(text) => setFormData({ ...formData, address: text })}
        placeholder="Ingrese la dirección"
        multiline
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

export default SupplierForm;