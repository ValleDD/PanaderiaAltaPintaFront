import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { DrawerNavigationOptions, createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';


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
        <Drawer.Screen name="Principal" component={HomeScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Cliente">
          {(props) => <ClientHomeScreen {...props} cart={cart} setCart={setCart} />}
        </Drawer.Screen>
        <Drawer.Screen name="TuTalega">
          {(props) => <CartScreen {...props} cart={cart}  setCart={setCart} />}
        </Drawer.Screen>
        <Drawer.Screen name="Historial Pedido" component={CustomerOrderScreen} />
        <Drawer.Screen name="Pago" component={PaymentScreen} />
        <Drawer.Screen name="Panadero Principal" component={BakeryHomeScreen} />
       
        <Drawer.Screen name="Panadero Pedido" component={OrdersBakeryScreen} />
       
       
        
        
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
