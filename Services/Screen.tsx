import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native"; 
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import HomeScreen from "../Component/HomeScreen";
import CustomerOrderScreen from "../Component/CustomerOrderScreen";
import LoginScreen from "../Component/LoginScreen";


const Drawer = createDrawerNavigator();

const Screen = () => {
  

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
    drawerActiveBackgroundColor: 'yellow',
    drawerInactiveTintColor: "black",
    drawerInactiveBackgroundColor: 'white',
    drawerType: "back",
  };

  const handleLogoPress = () => {
    
    console.log("Logo presionado");
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          ...drawerNavigatorScreenOptions,
          headerRight: () => (
            <TouchableOpacity onPress={handleLogoPress}>
              <Image
                style={{ width: 30, height: 30, marginLeft: 10,borderRadius:23 }} 
                source={require("../assets/carro.png")} 
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Image
              style={{ width: 40, height: 30, }} 
              source={require("../assets/PANADERO.png")} 
            />
          ),
        }}
      >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Porfolio" component={CustomerOrderScreen} />
            <Drawer.Screen name="Audio" component={LoginScreen} />
         
        
          
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Screen;


