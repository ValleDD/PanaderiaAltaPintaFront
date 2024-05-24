import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// PaymentScreen component
const PaymentScreen = () => {
  const [nombre, setNombre] = useState(""); // State for customer name
  const [apellido, setApellido] = useState(""); // State for customer last name
  const [direccion, setDireccion] = useState(""); // State for customer address
  const [numeroTarjeta, setNumeroTarjeta] = useState(""); // State for credit card number
  const navigation = useNavigation();

  // Function to handle payment
  const handlePayment = () => {
    // Display payment success alert and navigate to home screen
    Alert.alert("Pago Aceptado", "Su pago ha sido procesado con éxito", [
      { text: "OK", onPress: () => navigation.navigate("Client Home") },
    ]);
  };

  // Function to handle changes in credit card number input
  const handleNumeroTarjetaChange = (text) => {
    // Allow only numeric input and limit to 16 characters
    const cleaned = text.replace(/\D/g, "").slice(0, 16);
    setNumeroTarjeta(cleaned);
  };

  return (
    <ImageBackground
      source={require("../assets/fondo2.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Title */}
        <Text style={{ marginBottom: 20, fontSize: 24, color: "white" }}>
          FORMA DE PAGO
        </Text>

        {/* Card icons */}
        <View style={styles.cardIcons}>
          <Image
            source={require("../assets/paypal.png")}
            style={styles.cardIcon}
          />
          <Image
            source={require("../assets/pos-terminal.png")}
            style={styles.cardIcon}
          />
          <Image
            source={require("../assets/tarjeta-de-credito.png")}
            style={styles.cardIcon}
          />
          <Image
            source={require("../assets/pago-con-tarjeta.png")}
            style={styles.cardIcon}
          />
        </View>

        {/* Customer data inputs */}
        <View style={styles.customerData}>
          <Text style={styles.title}>Datos del Cliente</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            value={apellido}
            onChangeText={setApellido}
          />
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            value={direccion}
            onChangeText={setDireccion}
          />
          <TextInput
            style={styles.input}
            placeholder="Número de Tarjeta"
            value={numeroTarjeta}
            onChangeText={handleNumeroTarjetaChange}
            keyboardType="numeric"
            maxLength={16}
          />
        </View>

        {/* Payment button */}
        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Pagar</Text>
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
  },
  cardIcons: {
    flexDirection: "row",
    marginBottom: 20,
  },
  cardIcon: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  customerData: {
    margin: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    color: "black",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    width: 350,
    height: 50,
    fontSize: 20,
    color: "black",
  },
  button: {
    backgroundColor: "#ff6600",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default PaymentScreen;
