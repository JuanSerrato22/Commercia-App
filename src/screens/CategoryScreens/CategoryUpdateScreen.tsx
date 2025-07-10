// screens/CategoryUpdateScreen.tsx
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { CategoryStackParamList } from "../../navigations/types";
import { ICategory } from "../../api/types/ICategory";
import { getByIdCategory, updateCategory } from "../../api/services/CategoryServices";
import CategoryForm from "../../components/CategoryForm";

type CategoryUpdateScreenRouteProp = RouteProp<CategoryStackParamList, "CategoryUpdate">;

const CategoryUpdateScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<ICategory | undefined>(undefined);
  const navigation = useNavigation<NativeStackNavigationProp<CategoryStackParamList>>();
  const route = useRoute<CategoryUpdateScreenRouteProp>();

  const { id } = route.params;

  useEffect(() => {
    loadCategory();
  }, [id]);

  const loadCategory = async () => {
    try {
      setLoading(true);
      const data = await getByIdCategory(id);
      setInitialData(data);
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar la categoría");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (categoryData: ICategory) => {
    try {
      setLoading(true);
      await updateCategory(id, categoryData);
      Alert.alert(
        "Éxito", 
        "Categoría actualizada correctamente",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar la categoría");
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
      <CategoryForm 
        onSubmit={handleSubmit} 
        initialData={initialData}
        buttonText="Actualizar Categoría" 
      />
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

export default CategoryUpdateScreen;