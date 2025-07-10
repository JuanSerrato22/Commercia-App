// screens/ClientUpdateScreen.tsx
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ClientStackParamList } from "../../navigations/types";
import { IClient } from "../../api/types/IClient";
import { getByIdClient, updateClient } from "../../api/services/ClientServices";
import ClientForm from "../../components/ClientForm";

type ClientUpdateScreenRouteProp = RouteProp<ClientStackParamList, "ClientUpdate">;

const ClientUpdateScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<IClient | undefined>(undefined);
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();
  const route = useRoute<ClientUpdateScreenRouteProp>();

  const { id } = route.params;

  useEffect(() => {
    loadClient();
  }, [id]);

  const loadClient = async () => {
    try {
      setLoading(true);
      const data = await getByIdClient(id);
      setInitialData(data);
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar el cliente");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (clientData: IClient) => {
    try {
      setLoading(true);
      await updateClient(id, clientData);
      Alert.alert(
        "Éxito", 
        "Cliente actualizado correctamente",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el cliente");
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
      <ClientForm 
        onSubmit={handleSubmit} 
        initialData={initialData}
        buttonText="Actualizar Cliente" 
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

export default ClientUpdateScreen;