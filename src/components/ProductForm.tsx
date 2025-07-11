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
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoriaId: "",
  });

  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        nombre: initialData.nombre,
        descripcion: initialData.descripcion,
        precio: initialData.precio.toString(),
        stock: initialData.stock.toString(),
        categoriaId: initialData.categoria?.id?.toString() || "",
      });
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
    if (!formData.nombre || !formData.precio || !formData.stock || !formData.categoriaId) {
      Alert.alert("Error", "Por favor complete todos los campos obligatorios");
      return;
    }

    const productToSend: IProduct = {
      id: formData.id,
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: Number(formData.precio),
      stock: Number(formData.stock),
      categoria: {
        id: parseInt(formData.categoriaId),
      },
    };

    onSubmit(productToSend);
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
          selectedValue={formData.categoriaId}
          onValueChange={(value) => setFormData({ ...formData, categoriaId: value })}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione una categoría" value="" />
          {categories.map((category) => (
            <Picker.Item key={category.id} label={category.nombre} value={category.id.toString()} />
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

export default ProductForm;
