import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import { ButtonGroup } from 'react-native-elements'; // Make sure you have react-native-elements installed
import { useAuth } from "../Context/AuthContext";
import axios from 'axios';

const { height } = Dimensions.get("window");

type RootStackParamList = {
  Login: { isRegister: boolean };
  clientHome: undefined;
};

type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<{ route: LoginScreenRouteProp }> = ({ route }) => {
  const { login } = useAuth();
  const [correo_electronico, setCorreo_electronico] = useState<string>('');
  const [contrasena, setContrasena] = useState<string>('');
  const [nombre, setNombre] = useState<string>('');
  const [bakeryDetails, setBakeryDetails] = useState<string>('');
  const [direccion, setDireccion] = useState<string>('');
  const [rol, setRol] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const navigation = useNavigation<NavigationProp<any>>();
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [error, setError] = React.useState('');

  useEffect(() => {
    if (route.params?.isRegister) {
      setIsRegister(true);
      setSelectedIndex(0); // Select the Register button
    }
  }, [route.params?.isRegister]);

  const handleLogin = async () => {
    try {
      await login(correo_electronico, contrasena);
      navigation.navigate('Home');
      // Login successful, navigate to another page or perform necessary actions
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      const userData = {
        nombre,
        correo_electronico,
        contrasena,
        rol: selectedIndex === 1 ? 'baker' : 'user',
        bakeryDetails: selectedIndex === 1 ? bakeryDetails : '',
        direccion: selectedIndex === 0 ? direccion : '',
      };
      const response = await axios.post('http://192.168.1.38:3001/api/user/create', userData);
      if (response.status === 201) {
        Alert.alert('Registro exitoso', response.data.message);
        setIsRegister(false);
        setSelectedIndex(1);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Hubo un error al crear el usuario. Por favor, inténtalo de nuevo.');
    }
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
            selectedIndex={isRegister ? 0 : 1}
            onPress={(value) => {
              setIsRegister(value === 0);
              setSelectedIndex(value);
            }}
            buttonStyle={styles.button}
            selectedButtonStyle={styles.selectedButton} // Style for the selected button
            textStyle={styles.text}
            selectedTextStyle={styles.selectedText} // Style for the text of the selected button
          />

          {isRegister ? (
            <View>
              <Text style={styles.title}>Registro</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                onChangeText={setNombre}
                value={nombre}
              />
              <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                onChangeText={setCorreo_electronico}
                value={correo_electronico}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                onChangeText={setContrasena}
                value={contrasena}
                secureTextEntry
              />
              <ButtonGroup
                containerStyle={styles.buttonGroup}
                buttons={["Usuario", "Panadero"]}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                  setSelectedIndex(value);
                }}
              />
              {selectedIndex === 1 ? (
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
                  onChangeText={setDireccion}
                  value={direccion}
                />
              )}
              <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Registrarse</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={styles.title}>Inicio de Sesión</Text>
              <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                onChangeText={setCorreo_electronico}
                value={correo_electronico}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                onChangeText={setContrasena}
                value={contrasena}
                secureTextEntry
              />
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
              </TouchableOpacity>
            </View>
          )}
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
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
  },
  wrapper: {
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
    elevation: 10,
    marginTop: 15,
    marginBottom: 20
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
  loginButton: {
    height: 40,
    backgroundColor: "#7F5232", 
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 40
  },
  buttonGroup: {
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: 'white', 
  },
  button: {
    backgroundColor: 'white', 
  },
  selectedButton: {
    backgroundColor: '#7F5232',
  },
  text: {
    color: 'black', // Color of the text of unselected buttons
  },
  selectedText: {
    color: 'white', // Color of the text of the selected button
  },
  registerButton: {
    height: 40,
    backgroundColor: "#7F5232",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  registerButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LoginScreen;

