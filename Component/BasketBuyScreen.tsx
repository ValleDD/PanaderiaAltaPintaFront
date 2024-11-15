import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const BasketBuyScreen = ({ route, navigation }) => {
  const { cartItems = [] } = route.params || {}; // Asegúrate de que se pasa correctamente

  const [currentCartItems, setCurrentCartItems] = useState(cartItems);

  const renderCartItem = ({ item }) => (
    <View style={styles.shadowContainer}>
      <View style={styles.cartItem}>
        <Text style={styles.productName}>{item.nombre || 'Producto Sin Nombre'}</Text>
        <Text style={styles.productQuantity}>
          Cantidad: {item.cantidad || 1} {/* Valor por defecto */}
        </Text>
        <Text style={styles.productPrice}>
          Precio: €{item.precio || 0} {/* Valor por defecto */}
        </Text>
      </View>
    </View>
  );

  const totalQuantity = currentCartItems.reduce((total, item) => total + (item.cantidad || 1), 0);
  const totalPrice = currentCartItems.reduce((total, item) => total + ((item.cantidad || 1) * item.precio), 0);

  const handlePayment = () => {
    try {
      // Aquí puedes agregar la lógica de pago si la tienes
      setCurrentCartItems([]); // Vaciar el carrito
      navigation.navigate('ClientHomeScreen'); // Navegar a la pantalla principal o donde desees
    } catch (error) {
      console.error("Error al procesar el pago: ", error);
      alert("Ocurrió un error al procesar el pago.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/fondo2.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Tu Talega</Text>
        <FlatList
          data={currentCartItems} // Mostrar los productos del carrito
          renderItem={renderCartItem}
          keyExtractor={(item) => item.idProducto?.toString() || item.id?.toString() || item.nombre || Math.random().toString()} // Proporciona un identificador único si no hay id
          contentContainerStyle={styles.cartList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Cantidad Total: {totalQuantity}</Text>
          <Text style={styles.totalText}>Precio Total: €{totalPrice}</Text>
        </View>
        <TouchableOpacity 
          style={styles.payButton} 
          onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pagar Ahora</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'orange',
  },
  cartList: {
    paddingHorizontal: 10,
  },
  cartItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productQuantity: {
    fontSize: 14,
  },
  productPrice: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 5,
  },
  totalContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  payButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    opacity: 0.96,
  },
});

export default BasketBuyScreen;

