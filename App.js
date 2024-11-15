import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import Screen from "./Services/Screen";
import { AuthProvider } from "./Context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Screen />
      </AuthProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
