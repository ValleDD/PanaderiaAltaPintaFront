import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet,ImageBackground } from 'react-native';

const PaymentScreen = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [provincia, setProvincia] = useState('');

  const handlePayment = () => {
   
    console.log('Processing payment...');
  };

  return (
    <ImageBackground
    source={require("../assets/fondo2.jpg")}
    style={styles.backgroundImage}
  >
    <View style={styles.container}>
   
        <Text style={{marginBottom: 20, fontSize: 24, color: 'black'}}>FORMA DE PAGO</Text>
      <View style={styles.cardIcons}>
        <Image source={require('../assets/icon.png')} style={styles.cardIcon} />
        <Image source={require('../assets/icon.png')} style={styles.cardIcon} />
        <Image source={require('../assets/icon.png')} style={styles.cardIcon} />
      </View>
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
          placeholder="Provincia"
          value={provincia}
          onChangeText={setProvincia}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pagar</Text>
      </TouchableOpacity>
      
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardIcons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  cardIcon: {
    width: 50,
    height: 30,
    marginRight: 10,
  },
  customerData: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    width: 350, 
    height: 50,
    fontSize: 20,
    color: 'white'
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  // justifyContent: "center",
   // alignItems: "center",
  },
});

export default PaymentScreen;
