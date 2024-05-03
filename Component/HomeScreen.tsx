import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useFonts } from 'expo-font';

const HomeScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded] = useFonts({
    dancing: require("../assets/font/DancingScript-Regular.ttf"),
    bella: require("../assets/font/LaBelleAurore-Regular.ttf"),
  });

  const handleLogin = () => {
    // Aquí iría la lógica para el inicio de sesión
  };

  const handleSignUp = () => {
    // Aquí iría la lógica para el registro de usuario
  };

  if (!fontsLoaded) {
    // Si las fuentes no están cargadas aún, podemos devolver un componente de carga o simplemente null
    return null;
  }

  return (
    <ImageBackground
      source={require('../assets/fondo.jpg')} // Ruta de la imagen de fondo
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require('../assets/PANADERO.png')} // Ajusta la ruta a tu logo
          style={styles.logo}
        />
        <Text style={styles.title}>¡Bienvenidos a Panadería Alta Pinta!</Text>
        <Text style={styles.title1}>Sumérgete en el encanto de la tradición y el sabor auténtico en 
          nuestra panadería artesanal. Horneamos panes con esmero y pasión según 
          recetas ancestrales transmitidas de generación en generación. Nuestros 
          panaderos, verdaderos artesanos del oficio, cultivan la magia de la masa 
          madre para ofrecerte panes con un sabor rústico y único.</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión como Panadero</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión como Cliente</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpText}>¿Nuevo usuario? Registrarse aquí</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Ajusta la imagen al tamaño del contenedor
    justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, // Espacio adicional desde la parte superior
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Color de fondo con opacidad
  },
  logo: {
    width: 150, // Ajusta el ancho según lo necesites
    height: 150, // Ajusta la altura según lo necesites
    marginBottom: 14, // Mueve el logo hacia arriba
    borderRadius: 30
  },
  title: {
    fontSize: 24,
    fontFamily: "bella",
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#fff', // Color del texto
  },
  title1: {
    fontSize: 28,
    fontFamily: "dancing",
    marginBottom: 10,
    color: '#fff', // Color del texto
  },
  button: {
    width: '70%',
    height: 40,
    backgroundColor: '#7F5232',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 20,
    textDecorationLine: 'underline',
    color: '#fff', // Color del texto
  },
});

export default HomeScreen;
