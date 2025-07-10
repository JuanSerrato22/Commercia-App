// screens/CategoryRegisterScreen.tsx
import React, { useState } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CategoryStackParamList } from "../../navigations/types";
import { ICategory } from "../../api/types/ICategory";
import { createCategory } from "../../api/services/CategoryServices";
import CategoryForm from "../../components/CategoryForm";

const CategoryRegisterScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<CategoryStackParamList>>();

  const handleSubmit = async (categoryData: ICategory) => {
    try {
      setLoading(true);
      await createCategory(categoryData);
      Alert.alert(
        "Éxito", 
        "Categoría registrada correctamente",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar la categoría");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CategoryForm onSubmit={handleSubmit} buttonText="Registrar Categoría" />
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
});

export default CategoryRegisterScreen;