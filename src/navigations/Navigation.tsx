// navigations/Navigation.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Import screens
import ProductListScreen from "../screens/ProductScreens/ProductList";
import ProductRegisterScreen from "../screens/ProductScreens/ProductRegisterScreen";
import ProductUpdateScreen from "../screens/ProductScreens/ProductUpdateScreen";

import CategoryListScreen from "../screens/CategoryScreens/CategoryList";
import CategoryRegisterScreen from "../screens/CategoryScreens/CategoryRegisterScreen";
import CategoryUpdateScreen from "../screens/CategoryScreens/CategoryUpdateScreen";

import SupplierListScreen from "../screens/SupplierScreens/SupplierList";
import SupplierRegisterScreen from "../screens/SupplierScreens/SupplierRegisterScreen";
import SupplierUpdateScreen from "../screens/SupplierScreens/SupplierUpdateScreen";

import ClientListScreen from "../screens/ClientScreens/ClientList";
import ClientRegisterScreen from "../screens/ClientScreens/ClientRegisterScreen";
import ClientUpdateScreen from "../screens/ClientScreens/ClientUpdateScreen";

import OrderListScreen from "../screens/OrderScreens/OrderList";
import OrderRegisterScreen from "../screens/OrderScreens/OrderRegisterScreen";
import OrderUpdateScreen from "../screens/OrderScreens/OrderUpdateScreen";

// Stack Navigators
const ProductStack = createNativeStackNavigator();
const CategoryStack = createNativeStackNavigator();
const SupplierStack = createNativeStackNavigator();
const ClientStack = createNativeStackNavigator();
const OrderStack = createNativeStackNavigator();

function ProductStackNavigator() {
  return (
    <ProductStack.Navigator initialRouteName="ProductList">
      <ProductStack.Screen 
        name="ProductList" 
        component={ProductListScreen}
        options={{ title: "Productos" }}
      />
      <ProductStack.Screen 
        name="ProductRegister" 
        component={ProductRegisterScreen}
        options={{ title: "Registrar Producto" }}
      />
      <ProductStack.Screen 
        name="ProductUpdate" 
        component={ProductUpdateScreen}
        options={{ title: "Actualizar Producto" }}
      />
    </ProductStack.Navigator>
  );
}

function CategoryStackNavigator() {
  return (
    <CategoryStack.Navigator initialRouteName="CategoryList">
      <CategoryStack.Screen 
        name="CategoryList" 
        component={CategoryListScreen}
        options={{ title: "Categorías" }}
      />
      <CategoryStack.Screen 
        name="CategoryRegister" 
        component={CategoryRegisterScreen}
        options={{ title: "Registrar Categoría" }}
      />
      <CategoryStack.Screen 
        name="CategoryUpdate" 
        component={CategoryUpdateScreen}
        options={{ title: "Actualizar Categoría" }}
      />
    </CategoryStack.Navigator>
  );
}

function SupplierStackNavigator() {
  return (
    <SupplierStack.Navigator initialRouteName="SupplierList">
      <SupplierStack.Screen 
        name="SupplierList" 
        component={SupplierListScreen}
        options={{ title: "Proveedores" }}
      />
      <SupplierStack.Screen 
        name="SupplierRegister" 
        component={SupplierRegisterScreen}
        options={{ title: "Registrar Proveedor" }}
      />
      <SupplierStack.Screen 
        name="SupplierUpdate" 
        component={SupplierUpdateScreen}
        options={{ title: "Actualizar Proveedor" }}
      />
    </SupplierStack.Navigator>
  );
}

function ClientStackNavigator() {
  return (
    <ClientStack.Navigator initialRouteName="ClientList">
      <ClientStack.Screen 
        name="ClientList" 
        component={ClientListScreen}
        options={{ title: "Clientes" }}
      />
      <ClientStack.Screen 
        name="ClientRegister" 
        component={ClientRegisterScreen}
        options={{ title: "Registrar Cliente" }}
      />
      <ClientStack.Screen 
        name="ClientUpdate" 
        component={ClientUpdateScreen}
        options={{ title: "Actualizar Cliente" }}
      />
    </ClientStack.Navigator>
  );
}

function OrderStackNavigator() {
  return (
    <OrderStack.Navigator initialRouteName="OrderList">
      <OrderStack.Screen 
        name="OrderList" 
        component={OrderListScreen}
        options={{ title: "Pedidos" }}
      />
      <OrderStack.Screen 
        name="OrderRegister" 
        component={OrderRegisterScreen}
        options={{ title: "Registrar Pedido" }}
      />
      <OrderStack.Screen 
        name="OrderUpdate" 
        component={OrderUpdateScreen}
        options={{ title: "Actualizar Pedido" }}
      />
    </OrderStack.Navigator>
  );
}

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ 
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "#666",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Products"
        component={ProductStackNavigator}
        options={{
          tabBarLabel: "Productos",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryStackNavigator}
        options={{
          tabBarLabel: "Categorías",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="category" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Suppliers"
        component={SupplierStackNavigator}
        options={{
          tabBarLabel: "Proveedores",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-shipping" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Clients"
        component={ClientStackNavigator}
        options={{
          tabBarLabel: "Clientes",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStackNavigator}
        options={{
          tabBarLabel: "Pedidos",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="receipt" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}