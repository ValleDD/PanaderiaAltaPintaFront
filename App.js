import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import Screen from "./Services/Screen";
import { AuthProvider } from "./Context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Screen />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
