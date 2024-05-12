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
  
    fetch("http://localhost:3001/api/user/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la petición');
      }
      return response.json();
    })
    .then(data => {
      console.log("Registro exitoso:", data);
      alert("Registro exitoso");
    })
    .catch(error => {
      console.error('Error al registrar:', error); // Agregar manejo de errores aquí
      alert("Ocurrió un error al intentar registrar, por favor inténtalo de nuevo más tarde");
    });
  };
  

  return (
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
    borderRadius: 20, // Redondear el contenedor del ButtonGroup
    overflow: "hidden", // Asegurar que los bordes redondeados sean visibles
  },
  button: {
    borderRadius: 20,
    height: 20,
    width:20 // Redondear los botones
  },
 
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  registerButton: {
    width: "60%", // Ancho del botón
    height: 50, // Altura del botón
    backgroundColor: "blue", // Color de fondo del botón
    justifyContent: "center", // Centra verticalmente el contenido del botón
    alignItems: "center", // Centra horizontalmente el contenido del botón
    borderRadius: 25, // Radio de borde para hacerlo redondo
    alignSelf: "center", // Coloca el botón en el medio horizontal de la pantalla
    marginTop: 20, // Espacio en la parte superior del botón
  },
  registerButtonText: {
    color: "white", // Color del texto
    fontWeight: "bold", // Estilo de texto en negrita
  },
});


export default RegisterScreen;
