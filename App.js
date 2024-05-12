import React from 'react';
import { StyleSheet, ImageBackground, View, Text} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Screen from "./Services/Screen";
import OrdersEarringsScreen from './Component/OrdersEarringsScreen';
import ClientHomeScreen from './Component/ClientHomeScreen';

const App = () => {
  return (
   <ImageBackground
      source={require("./assets/fondo2.jpg")}
      style={styles.backgroundImage}
    >
      <ClientHomeScreen/>
      
       
   
  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  // justifyContent: "center",
   // alignItems: "center",
  },
});

export default App;
