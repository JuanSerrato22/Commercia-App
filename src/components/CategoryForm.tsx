import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ICategory } from "../api/types/ICategory";

interface Props {
  onSubmit: (category: ICategory) => void;
  initialData?: ICategory;
  buttonText?: string;
}

const CategoryForm: React.FC<Props> = ({ onSubmit, initialData, buttonText = "Guardar" }) => {
  const [formData, setFormData] = useState<ICategory>({
    id: "",
    nombre: "",
    descripcion: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!formData.nombre.trim()) {
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
        value={formData.nombre}
        onChangeText={(text) => setFormData({ ...formData, nombre: text })}
        placeholder="Ingrese el nombre de la categoría"
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={formData.descripcion}
        onChangeText={(text) => setFormData({ ...formData, descripcion: text })}
        placeholder="Ingrese la descripción"
        multiline
      />

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

export default CategoryForm;