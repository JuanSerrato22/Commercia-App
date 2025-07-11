import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ClientStackParamList } from "../../navigations/types";
import { IClient } from "../../api/types/IClient";
import { getAllClient } from "../../api/services/ClientServices";
import ClientCard from "../../components/ClientCard";
import AntDesign from "@expo/vector-icons/AntDesign";

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();

  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await getAllClient();
      setClients(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los clientes");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadClients();
    }, [])
  );

  const handleAddClient = () => {
    navigation.navigate("ClientRegister");
  };

  const handleDeleteClient = () => {
    loadClients(); // Recargar la lista después de eliminar
  };

  const renderItem = ({ item }: { item: IClient }) => (
    <ClientCard data={item} onDelete={handleDeleteClient} />
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Cargando clientes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddClient}>
        <AntDesign name="plus" size={24} color="white" />
        <Text style={styles.addButtonText}>Agregar Cliente</Text>
      </TouchableOpacity>

      {clients.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No hay clientes registrados</Text>
        </View>
      ) : (
        <FlatList
          data={clients}
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
    backgroundColor: "#143D60",
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

export default ClientList;