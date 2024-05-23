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
import { ButtonGroup } from 'react-native-elements'; // Asegúrate de tener react-native-elements instalado
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

  useEffect(() => {
    if (route.params?.isRegister) {
      setIsRegister(true);
      setSelectedIndex(0); // Selecciona el botón de Registro
    }
  }, [route.params?.isRegister]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/user/login', {
        nombre,
        correo_electronico,
        contrasena,
      });
      login(response.data.token);
      Alert.alert('Inicio de sesión exitoso');
      navigation.navigate('clientHome'); // Navega a clientHome después de iniciar sesión
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error al iniciar sesión', 'Revise sus credenciales e intente nuevamente');
    }
  };

  const handleRegister = async () => {
    try {
        const userData = {
            nombre,
            correo,
        };
        const response = await fetch('URL_DEL_SERVIDOR/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const responseData: ResponseData = await response.json();
        if (response.ok) {
            console.log(responseData.message);
            // Manejar la respuesta exitosa según necesites
        } else {
            throw new Error(responseData.message);
        }
    } catch (error) {
        console.error('Hubo un error al crear el usuario:', error);
        setErrorMessage('Hubo un error al crear el usuario. Por favor, inténtalo de nuevo.');
    }
};
  

  const [isRegister, setIsRegister] = useState<boolean>(false);

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
              setSelectedIndex(value);
            }}
            buttonStyle={styles.button}
            selectedButtonStyle={styles.selectedButton} // Estilo para el botón seleccionado
            textStyle={styles.text}
            selectedTextStyle={styles.selectedText} // Estilo para el texto del botón seleccionado
          />

          {isRegister ? (
            <View>
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
    color: 'black', // Color del texto de los botones no seleccionados
  },
  selectedText: {
    color: 'white', // Color del texto del botón seleccionado
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
