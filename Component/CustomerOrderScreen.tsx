import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const CustomerOrderScreen = ({ navigation }) => {
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
    navigation.navigate('Cart'); // Redireccionar a la pantalla de cesta
  };

  return (
    <ImageBackground
      source={require("../assets/fondo2.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Órdenes del Cliente</Text>
        <FlatList
          data={pedidos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.pedidoContainer}>
              <Text style={styles.productoText}>Producto: {item.producto}</Text>
              <Text style={styles.cantidadText}>Cantidad: {item.cantidad}</Text>
              <Button title="Rehacer pedido" onPress={() => rehacerPedido(item)} />
            </View>
          )}
        />
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.homeButtonText}>Ir a Home</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  pedidoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  productoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cantidadText: {
    fontSize: 16,
  },
  homeButton: {
    backgroundColor: '#fa560b',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  homeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default CustomerOrderScreen;
