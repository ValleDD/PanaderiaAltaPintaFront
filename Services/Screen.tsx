import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { DrawerNavigationOptions, createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';

import HomeScreen from "../Component/HomeScreen";
import CustomerOrderScreen from "../Component/CustomerOrderScreen";
import LoginScreen from "../Component/LoginScreen";
import ClientHomeScreen from "../Component/ClientHomeScreen";
import PaymentScreen from "../Component/PaymentScreen";
import CartScreen from "../Component/CartScreen";
import BakeryHomeScreen from "../Component/BakeyHomeScreen";
import OrdersBakeryScreen from "../Component/OrdersEarringsScreen";
import { AuthProvider } from "../Context/AuthContext";

const Drawer = createDrawerNavigator();

const Screen = () => {
  const [cart, setCart] = useState([]);

  const drawerNavigatorScreenOptions: DrawerNavigationOptions = {
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: "black",
    drawerItemStyle: {
      width: "100%",
    },
    drawerContentStyle: { width: 270, borderRadius: 30 },
    drawerActiveTintColor: "white",
    drawerActiveBackgroundColor: '#adadad',
    drawerInactiveTintColor: "black",
    drawerInactiveBackgroundColor: 'white',
    drawerType: "back",
  };

  const handleLogoPress = () => {
    console.log("Logo presionado");
  };

  const handleCartPress = () => {
    // Tu error original se debía a que la función handleCartPress no tenía acceso a la navegación
    // Una solución es utilizar useNavigation hook para obtener la navegación
    const navigation = useNavigation(); // Importa el hook useNavigation
    navigation.navigate('Cart');
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
        <Drawer.Screen name="Home">
          {(props) => <ClientHomeScreen {...props} cart={cart} setCart={setCart} />}
        </Drawer.Screen>
        <Drawer.Screen name="Bakery" component={BakeryHomeScreen} />
        <Drawer.Screen name="CustomerOrders" component={CustomerOrderScreen} />
        <Drawer.Screen name="Orders" component={OrdersBakeryScreen} />
        <Drawer.Screen name="Payment" component={PaymentScreen} />
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Cart">
          {(props) => <CartScreen {...props} cart={cart}  setCart={setCart} />}
        </Drawer.Screen>
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
