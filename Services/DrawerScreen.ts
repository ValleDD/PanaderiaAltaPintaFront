import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../Component/HomeScreen";
import LoginScreen from "../Component/LoginScreen";

const Drawer = createDrawerNavigator();

const DrawerScreens = () => {
  
  const drawerNavigatorScreenOptions = {
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "rgba(153, 132, 105, 0.5)", // Color de fondo con transparencia
      borderBottomWidth: 0, // Sin borde inferior
      elevation: 0, // Sin sombra en Android
    },
    headerTintColor: "black",
    drawerItemStyle: {
      width: "100%",
    },
    drawerContentStyle: { width: 270, borderRadius: 30 },
    drawerActiveTintColor: "white",
    drawerActiveBackgroundColor: "black", // Usamos un color válido de React Native
    drawerInactiveTintColor: "black",
    drawerInactiveBackgroundColor: "white", // Usamos un color válido de React Native
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
          headerTitle: () => (
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require("../assets/favicon.png")}
              />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleLogoPress}>
              <Image
                style={{ width: 50, height: 50, marginLeft: 10 }}
                source={require("../assets/favicon.png")}
              />
            </TouchableOpacity>
          ),
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Porfolio" component={LoginScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default DrawerScreens;
