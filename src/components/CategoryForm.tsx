import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ICategory } from "../api/types/ICategory";
import { Picker } from "@react-native-picker/picker";

interface Props {
  onSubmit: (category: ICategory) => void;
  initialData?: ICategory;
  buttonText?: string;
}

const CategoryForm: React.FC<Props> = ({ onSubmit, initialData, buttonText = "Guardar" }) => {
  const [formData, setFormData] = useState<ICategory>({
    id_category: "",
    name: "",
    description: "",
    status: "1",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      Alert.alert("Error", "Por favor ingrese el nombre de la categoría");
      return;
    }
    onSubmit(formData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre *</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        placeholder="Ingrese el nombre de la categoría"
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
        placeholder="Ingrese la descripción"
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
    backgroundColor: "#007bff",
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

export default CategoryForm;