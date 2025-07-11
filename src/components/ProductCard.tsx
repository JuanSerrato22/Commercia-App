import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IProduct } from "../api/types/IProduct";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProductStackParamList } from "../navigations/types";

interface Props {
  data: IProduct;
  onDelete?: () => void;
}

const ProductCard: React.FC<Props> = ({ data, onDelete }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ProductStackParamList>>();

  const handleEdit = () => {
    navigation.navigate("ProductUpdate", { id: data.id });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{data.nombre}</Text>
      <Text style={styles.text}>Descripción: {data.descripcion}</Text>
      <Text style={styles.text}>Precio: ${data.precio}</Text>
      <Text style={styles.text}>Stock: {data.stock}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonEdit} onPress={handleEdit}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => {
            console.log("🧪 BOTÓN ELIMINAR PRESIONADO");
            onDelete?.(); // Aquí se llama la función que está definida en ProductList
          }}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    margin: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  text: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },
  buttonEdit: {
    backgroundColor: "#143D60",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonDelete: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProductCard;
