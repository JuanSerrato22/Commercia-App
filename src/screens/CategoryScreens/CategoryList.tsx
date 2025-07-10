// screens/CategoryListScreen.tsx
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CategoryStackParamList } from "../../navigations/types";
import { ICategory } from "../../api/types/ICategory";
import { getAllCategory } from "../../api/services/CategoryServices";
import CategoryCard from "../../components/CategoryCard";
import AntDesign from "@expo/vector-icons/AntDesign";

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<CategoryStackParamList>>();

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await getAllCategory();
      setCategories(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las categorías");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCategories();
    }, [])
  );

  const handleAddCategory = () => {
    navigation.navigate("CategoryRegister");
  };

  const handleDeleteCategory = () => {
    loadCategories(); // Recargar la lista después de eliminar
  };

  const renderItem = ({ item }: { item: ICategory }) => (
    <CategoryCard data={item} onDelete={handleDeleteCategory} />
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Cargando categorías...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
        <AntDesign name="plus" size={24} color="white" />
        <Text style={styles.addButtonText}>Agregar Categoría</Text>
      </TouchableOpacity>

      {categories.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No hay categorías registradas</Text>
        </View>
      ) : (
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#007bff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  listContainer: {
    paddingBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default CategoryList;