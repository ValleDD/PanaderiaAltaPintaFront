
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Component/HomeScreen';
import ClientHomeScreen from './Component/ClientHomeScreen';
import LoginScreen from './Component/LoginScreen';
import RegisterScreen from './Component/RegisterScreen';


export default function App() {
  return (
    <View style={styles.container}>
    <RegisterScreen/>
    </View>
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
