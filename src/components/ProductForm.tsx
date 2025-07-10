import { IProduct } from "../api/types/IProduct";
import { ScrollView, TextInput, View, StyleSheet } from "react-native";

interface Props {
  form: IProduct;
  handleChange: (field: keyof IProduct, value: string) => void;
}

const ProductForm: React.FC<Props> = ({ form, handleChange }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={form.description}
        onChangeText={(text) => handleChange("description", text)}
        multiline
        numberOfLines={3}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={form.price}
        onChangeText={(text) => handleChange("price", text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        value={form.stock}
        onChangeText={(text) => handleChange("stock", text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={form.status}
        onChangeText={(text) => handleChange("status", text)}
        keyboardType="numeric"
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default ProductForm;
