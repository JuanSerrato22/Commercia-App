import React, { useState } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ClientStackParamList } from "../../navigations/types";
import { IClient } from "../../api/types/IClient";
import { createClient } from "../../api/services/ClientServices";
import ClientForm from "../../components/ClientForm";

const ClientRegisterScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();

  const handleSubmit = async (clientData: IClient) => {
    try {
      setLoading(true);
      await createClient(clientData);
      Alert.alert(
        "Éxito", 
        "Cliente registrado correctamente",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar el cliente");
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
      <ClientForm onSubmit={handleSubmit} buttonText="Registrar Cliente" />
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

export default ClientRegisterScreen;