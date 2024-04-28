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

  const handleRegister = () => {
   
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/fondo.jpg")} // Tu imagen de fondo
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Image
            source={require("../assets/PANADERO.png")}
            style={styles.logo}
          />
        </View>
      </ImageBackground>

      <View style={styles.wrapper}>
        
          <ButtonGroup
            buttonStyle={styles.button1}
            buttons={["REGISTRO","INICIO" ]}
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
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    elevation: 5,
  },
 /* header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },*/
 /* headerButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "blue",
    width: "48%",
  },
  headerButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },*/
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
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  button1:{
    borderRadius:23
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
