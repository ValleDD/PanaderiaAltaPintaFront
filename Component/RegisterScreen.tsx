import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { ButtonGroup } from "@rneui/themed";

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [bakeryDetails, setBakeryDetails] = useState("");
  const [isBaker, setIsBaker] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexes, setSelectedIndexes] = useState([0, 2]);
  //fallo en elregistro en el postmant lo hace pero aqui no

  const handleRegister = () => {
    if (!name || !email || !password || (!isBaker && !address) || (isBaker && !bakeryDetails)) {
      alert("Por favor completa todos los campos");
      return;
    }
  
    const userData = {
      nombre: name,
      correo_electronico: email,
      contraseña: password,
      rol: isBaker ? "Panadero" : "Usuario",
      direccion: isBaker ? "" : address,
      detalles_panaderia: isBaker ? bakeryDetails : "",
    };
  
   //seguir con la conexion
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
      

      <View style={styles.wrapper}>
        <ButtonGroup
          
          containerStyle={styles.buttonGroup}
          buttons={["REGISTRO", "INICIO"]}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
          }}
        />

        <Text style={styles.title}>Registro</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={setName}
          value={name}
        />
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
        <ButtonGroup
         
          containerStyle={styles.buttonGroup}
          buttons={["Usuario", "Panadero"]}
          selectedIndex={isBaker ? 1 : 0}
          onPress={(value) => {
            setIsBaker(value === 1);
          }}
        />
        {isBaker ? (
          <TextInput
            style={styles.input}
            placeholder="Detalles de la Panadería"
            onChangeText={setBakeryDetails}
            value={bakeryDetails}
          />
        ) : (
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            onChangeText={setAddress}
            value={address}
          />
        )}
        <TouchableOpacity  style={styles.registerButton} onPress={handleRegister}>
          <Text  style={styles.registerButtonText}>Registrarse</Text>
        </TouchableOpacity>
      
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  wrapper: {
    position: "absolute",
    bottom: 10, 
    left: 10,
    right: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 34,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 550,
    borderRadius: 12,
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
  buttonGroup: {
    borderRadius: 20, 
    overflow: "hidden", 
  },
  button: {
    borderRadius: 20,
    height: 20,
    width:20
  },
 
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  registerButton: {
    width: "60%",
    height: 50,
    backgroundColor: "blue",
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: 25, 
    alignSelf: "center", 
    marginTop: 20, 
  },
  registerButtonText: {
    color: "white", 
    fontWeight: "bold", 
  },
});


export default RegisterScreen;
