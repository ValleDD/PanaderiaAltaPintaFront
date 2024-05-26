import React, { useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from "@react-navigation/drawer";

import CustomerOrderScreen from "../Component/CustomerOrderScreen";
import LoginScreen from "../Component/LoginScreen";
import ClientHomeScreen from "../Component/ClientHomeScreen";
import PaymentScreen from "../Component/PaymentScreen";
import BasketBuyScreen from "../Component/BasketBuyScreen";
import OrdersBakeryScreen from "../Component/OrdersBakeryScreen";
import { useAuth } from "../Context/AuthContext";
import HomeScreen from "../Component/HomeScreen";
import BakeryHomeScreen from "../Component/BakeyHomeScreen";


const Drawer = createDrawerNavigator();

const Screen = () => {
  const { auth, logout } = useAuth();
  const [cart, setCart] = useState<any[]>([]);
  const navigation = useNavigation(); // Obtener el objeto de navegación

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
    logout();

  };

  // Function to handle cart press
  const handleCartPress = () => {
    navigation.navigate("Your Cart");
  };

  return (
  
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          ...drawerNavigatorScreenOptions,
          headerRight: () => (
            <TouchableOpacity onPress={handleCartPress}>
              <Text>
                <Image
                  style={styles.ImgCarrito}
                  source={require("../assets/carro.png")}
                />
              </Text>
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <TouchableOpacity onPress={handleLogoPress}>
              <Image
                style={styles.ImgLogo}
                source={require("../assets/PANADERO.png")}
              />
            </TouchableOpacity>
          ),
        }}
      >
        {auth ? (
          <>
            <Drawer.Screen name="Client Home" component={ClientHomeScreen} />
            <Drawer.Screen name="Your Cart" component={BasketBuyScreen} />
            <Drawer.Screen name="Order History" component={CustomerOrderScreen} />
            <Drawer.Screen name="Payment" component={PaymentScreen} />
            <Drawer.Screen name="Bakery Home" component={BakeryHomeScreen} />
            <Drawer.Screen name="Panadero Orders" component={OrdersBakeryScreen} />
          </>
        ) : (
          <>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Login" component={LoginScreen} />
          
          </>
        )}
      </Drawer.Navigator>
    
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
