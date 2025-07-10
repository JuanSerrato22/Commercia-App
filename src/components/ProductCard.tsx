import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IProduct } from "../api/types/IProduct";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProducttackParamsList } from "../navigations/types";
import { deleteProduct } from "../api/services/ProductServices";

interface Props {
    data: IProduct;
}

const ProductCard: React.FC<Props> = ({ data }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<ProducttackParamsList>>();

    const handleEdit = () => {
        navigation.navigate("ProductUpdate", { id: data.id_product.toString() });
    };

    const handleDelete = async () => {
        const registro = await deleteProduct(data.id_product);
    };
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{data.name}</Text>
            <Text style={styles.text}>Descripcion: {data.description}</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonEdit} onPress={handleEdit}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
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
    },
    text: {
        fontSize: 14,
        color: "#333",
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 12,
        justifyContent: "space-between",
    },
    buttonEdit: {
        backgroundColor: "#1e90ff",
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
