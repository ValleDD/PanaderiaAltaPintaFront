import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

import CustomerOrderScreen from "../Component/CustomerOrderScreen";
import LoginScreen from "../Component/LoginScreen";
import ClientHomeScreen from "../Component/ClientHomeScreen";
import PaymentScreen from "../Component/PaymentScreen";
import CartScreen from "../Component/BasketBuy";
import BakeryHomeScreen from "../Component/BakeyHomeScreen";
import OrdersBakeryScreen from "../Component/OrdersBakeryScreen";
import { AuthProvider } from "../Context/AuthContext";
import HomeScreen from "../Component/HomeScreen";

const Drawer = createDrawerNavigator();

const Screen = () => {
  const [cart, setCart] = useState([]);

  // Drawer navigation options
  const drawerNavigatorScreenOptions: DrawerNavigationOptions = {
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "white",
    },
    headerTintColor: "black",
    drawerItemStyle: {
      width: "100%",
    },
    drawerContentStyle: { width: 270, borderRadius: 30 },
    drawerActiveTintColor: "white",
    drawerActiveBackgroundColor: "#adadad",
    drawerInactiveTintColor: "black",
    drawerInactiveBackgroundColor: "white",
    drawerType: "back",
  };

  // Function to handle logo press
  const handleLogoPress = () => {
    console.log("Logo pressed");
  };

  // Function to handle cart press
  const handleCartPress = () => {
    // Your original error was because handleCartPress didn't have access to navigation
    // One solution is to use the useNavigation hook to get navigation
    const navigation = useNavigation(); // Import the useNavigation hook
    navigation.navigate("Cart");
  };

  return (
    <AuthProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            ...drawerNavigatorScreenOptions,
            headerRight: () => (
              <TouchableOpacity onPress={handleCartPress}>
                <Image
                  style={styles.ImgCarrito}
                  source={require("../assets/carro.png")}
                />
              </TouchableOpacity>
            ),
            headerTitle: () => (
              <Image
                style={styles.ImgLogo}
                source={require("../assets/PANADERO.png")}
              />
            ),
          }}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Client Home">
            {(props) => (
              <ClientHomeScreen {...props} cart={cart} setCart={setCart} />
            )}
          </Drawer.Screen>
          <Drawer.Screen name="Your Cart">
            {(props) => <CartScreen {...props} cart={cart} setCart={setCart} />}
          </Drawer.Screen>
          <Drawer.Screen name="Order History" component={CustomerOrderScreen} />
          <Drawer.Screen name="Payment" component={PaymentScreen} />
          <Drawer.Screen name="Bakery Home" component={BakeryHomeScreen} />
          <Drawer.Screen
            name="Panadero Orders"
            component={OrdersBakeryScreen}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  ImgLogo: {
    width: 40,
    height: 30,
  },
  ImgCarrito: {
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 23,
  },
});

export default Screen;
