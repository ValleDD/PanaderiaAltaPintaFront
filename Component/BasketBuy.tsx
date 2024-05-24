import React, { useState, useEffect,  } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";

const BasketBuy = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Llamada al servidor para obtener los datos del carrito
    fetch("http://192.168.1.38:3001/api/pedido/listar")
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("Error al obtener datos del carrito:", error));
  }, []);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemTextContainer}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>{item.price}</Text>
        <Text style={styles.cartItemQuantity}>Cantidad: {item.quantity}</Text>
        {item.notes ? (
          <Text style={styles.cartItemNotes}>Notas: {item.notes}</Text>
        ) : null}
      </View>
    </View>
  );

  return (
    <ImageBackground
    source={require("../assets/fondo2.jpg")}
    style={styles.backgroundImage}
  >
    <View style={styles.container}>
      <Text style={styles.heading}>Cesta de la compra</Text>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cartList}
      />
      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => navigation.navigate("Payment")}
      >
        <Text style={styles.paymentButtonText}>Ir a Pagar</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
    color:'#fc4b08',
    textAlign: "center",
    justifyContent: "center", 
    alignItems: "center"
  },
  cartList: {
    paddingBottom: 20,
  },
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cartItemImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 5,
  },
  cartItemTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  cartItemPrice: {
    fontSize: 14,
    color: "black",
  },
  cartItemQuantity: {
    fontSize: 14,
    color: "black",
  },
  cartItemNotes: {
    fontSize: 14,
    color: "gray",
  },
  paymentButton: {
    padding: 15,
    backgroundColor: "#fa560b",
    borderRadius: 25,
    alignItems: "center",
    margin: 20,
  },
  paymentButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default BasketBuy;
