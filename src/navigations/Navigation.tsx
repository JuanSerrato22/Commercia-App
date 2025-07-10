import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


//import screens
import ProductListScreen from "../screens/ProductList";
import ProductRegisterScreen from "../screens/ProductRegisterScreen";
import ProductUpdateScreen from "../screens/ProductUpdateScreen";

//import icon
import AntDesign from "@expo/vector-icons/AntDesign";

//import stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ProductStackNavigator = createNativeStackNavigator();

function MyStack() {
  return (
    <ProductStackNavigator.Navigator initialRouteName="ProductList">
      <ProductStackNavigator.Screen name="ProductList" component={ProductListScreen} />
      <ProductStackNavigator.Screen name="ProductRegister" component={ProductRegisterScreen} />
      <ProductStackNavigator.Screen name="ProductUpdate" component={ProductUpdateScreen} />
    </ProductStackNavigator.Navigator>
  );
}

//instance for createBottomTabNavigator
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="ProductList"
      screenOptions={{ tabBarActiveTintColor: "purple" }}
    >
      <Tab.Screen
        name="ProductList"
        component={MyStack}
        options={{
          tabBarLabel: "List",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color="black" />
          ),
          tabBarBadge: 5,
        }}
      />
      <Tab.Screen
        name="ProductRegister"
        component={ProductListScreen}
        options={{
          tabBarLabel: "ProductRegister",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
