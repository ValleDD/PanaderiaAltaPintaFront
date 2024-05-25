import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const sampleCart = [
  { id: 1, Nombre: 'Product 1', cantidad: 2, precio: 10 },
  { id: 2, Nombre: 'Product 2', cantidad: 1, precio: 15 },
  { id: 3, Nombre: 'Product 3', cantidad: 3, precio: 20 },
];

const BasketBuyScreen = ({ navigation }) => {
  const renderCartItem = ({ item }) => (
    <View style={styles.shadowContainer}>
      <View style={styles.cartItem}>
        <Text style={styles.productName}>{item.Nombre}</Text>
        <Text style={styles.productQuantity}>Cantidad: {item.cantidad}</Text>
        <Text style={styles.productPrice}>Precio: €{item.precio}</Text>
      </View>
    </View>
  );

  // Calculate total quantity and total price
  const totalQuantity = sampleCart.reduce((total, item) => total + item.cantidad, 0);
  const totalPrice = sampleCart.reduce((total, item) => total + (item.cantidad * item.precio), 0);

  return (
    <ImageBackground
      source={require("../assets/fondo2.jpg")}
      style={styles.backgroundImage}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Tu Talega</Text>
      <FlatList
        data={sampleCart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cartList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Cantidad Total: {totalQuantity}</Text>
        <Text style={styles.totalText}>Precio Total: €{totalPrice}</Text>
      </View>
      <TouchableOpacity 
        style={styles.payButton} 
        onPress={() => navigation.navigate('Payment')}>
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

