import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";

const { height } = Dimensions.get("window");

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
  
  };

  const handleSignUp = () => {
    
  };

  return (
    <ImageBackground
    source={require("../assets/fondo2.jpg")}
    style={styles.backgroundImage}
  >
    <View style={styles.container}>
     
        <View style={styles.overlay}>
          <Image
            source={require("../assets/PANADERO.png")}
            style={styles.logo}
          />
        </View>
      

      <View style={styles.formContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Registro</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Inicio de Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
       
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpText}>
            ¿Nuevo usuario? Registrarse aquí
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
 // backgroundImage: {
   // width: "111%",
   // height: height * 0.72,
   // resizeMode: "cover",
 // },
  overlay: {
    flex: 1,
    justifyContent: "flex-start", 
    alignItems: "center",
    marginTop:50
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 30,
    marginTop: -100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    height: 40,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: "48%", 
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  signUpText: {
    marginTop: 20,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  loginButton: {
    height: 40,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  // justifyContent: "center",
   // alignItems: "center",
  },
});

export default LoginScreen;

