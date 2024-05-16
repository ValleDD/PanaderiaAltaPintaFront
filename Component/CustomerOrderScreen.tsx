import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ImageBackground } from 'react-native';

const  CustomerOrderScreen = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const obtenerPedidos = async () => {
      const datosDePrueba = [
        { id: '1', producto: 'Producto 1', cantidad: 2 },
        { id: '2', producto: 'Producto 2', cantidad: 1 },
      ];
      setPedidos(datosDePrueba);
    };

    obtenerPedidos();
  }, []);

  const rehacerPedido = (pedido) => {
   
    console.log(`Rehaciendo pedido: ${pedido.producto}`);
  };

  return (
    <ImageBackground
    source={require("../assets/fondo2.jpg")}
    style={styles.backgroundImage}
  >
    <View style={styles.container}>
      <Text style={styles.title}>Órdenes del Cliente</Text>
      <FlatList
        style={styles.flast}
        data={pedidos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ margin: 10 }}>
            <Text>Producto: {item.producto}</Text>
            <Text>Cantidad: {item.cantidad}</Text>
            <Button title="Rehacer pedido" onPress={() => rehacerPedido(item)} />
          </View>
        )}
      />
    </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  title:{
    fontSize: 20, 
    fontWeight: 'bold' 
  }, 
  container:{
    marginTop: 40,
  },
  flast:{
    color: 'white',
    backgroundColor: 'white',
    margin: 10
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  // justifyContent: "center",
   // alignItems: "center",
  },

});

export default CustomerOrderScreen;
