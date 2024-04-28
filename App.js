
import { StyleSheet } from 'react-native';
import HomeScreen from './Component/HomeScreen';
import LoginScreen from './Component/LoginScreen';
import RegisterScreen from './Component/RegisterScreen';

import BakeryHomeScreen from './Component/BakeyHomeScreen';
import ClientHomeScreen from './Component/ClientHomeScreen';



export default function App() {
  return (
    <RegisterScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
