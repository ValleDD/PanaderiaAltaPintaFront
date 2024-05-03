
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Image, TouchableOpacity } from "react-native"; // Importa TouchableOpacity de react-native
import {
  DrawerNavigationOptions,
  
} from "@react-navigation/drawer";
import HomeScreen from "../Component/HomeScreen";
import LoginScreen from "../Component/LoginScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";


const Drawer = createDrawerNavigator();

const Screen = () => {
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
    drawerActiveBackgroundColor: "white",
    drawerInactiveTintColor: "black",
    drawerInactiveBackgroundColor: "white",
    drawerType: "back",
  };

  const handleLogoPress = () => {
    // Maneja la acción cuando se presiona el logo (puedes navegar a una página específica aquí)
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
                style={{ width: 50, height: 50, marginLeft: 10 }} // Ajusta el tamaño y el margen del primer logo
                source={require("../assets/favicon.png")} // Ajusta la ruta de tu primer logo
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Image
              style={{ width: 50, height: 50 }} // Ajusta el tamaño del segundo logo
              source={require("../assets/favicon.png")} // Ajusta la ruta de tu segundo logo
            />
          ),
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Porfolio" component={LoginScreen} />
       
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Screen;
