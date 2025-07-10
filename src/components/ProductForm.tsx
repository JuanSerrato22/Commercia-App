// components/ProductForm.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { IProduct } from "../api/types/IProduct";
import { getAllCategory } from "../api/services/CategoryServices";
import { ICategory } from "../api/types/ICategory";
import { Picker } from "@react-native-picker/picker";

interface Props {
  onSubmit: (product: IProduct) => void;
  initialData?: IProduct;
  buttonText?: string;
}

const ProductForm: React.FC<Props> = ({ onSubmit, initialData, buttonText = "Guardar" }) => {
  const [formData, setFormData] = useState<IProduct>({
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria_id: "",
  });
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
    loadCategories();
  }, [initialData]);

  const loadCategories = async () => {
    try {
      const data = await getAllCategory();
      setCategories(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las categorías");
    }
  };

  const handleSubmit = () => {
    if (!formData.nombre || !formData.precio || !formData.stock || !formData.categoria_id) {
      Alert.alert("Error", "Por favor complete todos los campos obligatorios");
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
        placeholder="Ingrese el nombre del producto"
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={formData.descripcion}
        onChangeText={(text) => setFormData({ ...formData, descripcion: text })}
        placeholder="Ingrese la descripción"
        multiline
      />

      <Text style={styles.label}>Precio *</Text>
      <TextInput
        style={styles.input}
        value={formData.precio}
        onChangeText={(text) => setFormData({ ...formData, precio: text })}
        placeholder="Ingrese el precio"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Stock *</Text>
      <TextInput
        style={styles.input}
        value={formData.stock}
        onChangeText={(text) => setFormData({ ...formData, stock: text })}
        placeholder="Ingrese el stock"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Categoría *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.categoria_id}
          onValueChange={(value) => setFormData({ ...formData, categoria_id: value })}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione una categoría" value="" />
          {categories.map((category) => (
            <Picker.Item 
              key={category.id} 
              label={category.nombre} 
              value={category.id} 
            />
          ))}
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

export default ProductForm;