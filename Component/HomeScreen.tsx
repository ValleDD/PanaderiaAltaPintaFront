// Importing necessary modules from React Native
import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
// Importing fonts and navigation hook from external libraries
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

// Functional component for the Home Screen
const HomeScreen = () => {
  // State to manage the loading of fonts
  const [fontsLoaded] = useFonts({
    dancing: require("../assets/font/DancingScript-Regular.ttf"),
    bella: require("../assets/font/LaBelleAurore-Regular.ttf"),
  });

  // Hook to access navigation object
  const navigation = useNavigation();

  // Function to handle login based on user type
  const handleLogin = (userType) => {
    navigation.navigate("Login");
  };

  // Function to handle sign up navigation
  const handleSignUp = () => {
    navigation.navigate("Login");
  };

  // If fonts are not loaded yet, return null
  if (!fontsLoaded) {
    return null;
  }

  // Render UI
  return (
    <ImageBackground
      source={require("../assets/fondo2.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Logo */}
        <Image source={require("../assets/PANADERO.png")} style={styles.logo} />
        {/* Title */}
        <Text style={styles.title}>¡Bienvenidos a Panadería Alta Pinta!</Text>
        {/* Description */}
        <Text style={styles.title1}>
          Sumérgete en el encanto de la tradición y el sabor auténtico en
          nuestra panadería artesanal. Horneamos panes con esmero y pasión según
          recetas ancestrales transmitidas de generación en generación. Nuestros
          panaderos, verdaderos artesanos del oficio, cultivan la magia de la
          masa madre para ofrecerte panes con un sabor rústico y único.
        </Text>
        {/* Button to login as a customer */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLogin("Cliente")}
        >
          <Text style={styles.buttonText}>Iniciar Sesión como Cliente</Text>
        </TouchableOpacity>
        {/* Button to login as a baker */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLogin("Panadero")}
        >
          <Text style={styles.buttonText}>Iniciar Sesión como Panadero</Text>
        </TouchableOpacity>
        {/* Link to sign up */}
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpText}>
            ¿Nuevo usuario? Registrarse aquí
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 41,
    borderRadius: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: "bella",
    fontWeight: "bold",
    marginBottom: 2,
    color: "#fff",
  },
  title1: {
    fontSize: 18,
    fontFamily: "dancing",
    marginBottom: 10,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  button: {
    width: "70%",
    height: 40,
    backgroundColor: "#7F5232",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  signUpText: {
    marginTop: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    opacity: 0.9,
  },
});

// Exporting the component as default
export default HomeScreen;
