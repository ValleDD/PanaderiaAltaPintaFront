import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import HomeScreen from "../Component/HomeScreen";
import LoginScreen from "../Component/LoginScreen";
import RegisterScreen from "../Component/RegisterScreen";

const Drawer = createDrawerNavigator();

const Screen = () => {
  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
          <TouchableOpacity onPress={handleLogoPress}>
            <Image
              style={styles.logo}
              source={require("../assets/favicon.png")}
            />
          </TouchableOpacity>
        </View>

        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate("Home")}
        />
        <DrawerItem
          label="Porfolio"
          onPress={() => props.navigation.navigate("Porfolio")}
        />
        <DrawerItem
          label="Audio"
          onPress={() => props.navigation.navigate("Audio")}
        />

        <DrawerItem
          label="Login"
          onPress={() => props.navigation.navigate("Login")}
        />
        <DrawerItem
          label="Registro"
          onPress={() => props.navigation.navigate("Registro")}
        />
      </DrawerContentScrollView>
    );
  };

  const handleLogoPress = () => {
    console.log("Logo presionado");
  };

  return (
    <View style={styles.container}>
      
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
              drawerActiveTintColor: "blue",
              drawerInactiveTintColor: "white",
              drawerItemStyle: { marginVertical: 5 },
              drawerStyle: { backgroundColor: "transparent", width: "60%" },
            }}
          >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Porfolio" component={LoginScreen} />
            <Drawer.Screen name="Audio" component={RegisterScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  drawerHeader: {
    backgroundColor: "white",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Screen;
