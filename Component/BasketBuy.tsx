import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const BasketBuy = ({ navigation }) => {
  // State variable to store cart data
  const [cart, setCart] = useState([]);

  // Fetch cart data from the server when the component mounts
  useEffect(() => {
    fetch("http://192.168.1.38:3001/api/pedido/listar")
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("Error fetching cart data:", error));
  }, []);

  // Render individual cart items
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemTextContainer}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>{item.price}</Text>
        <Text style={styles.cartItemQuantity}>Quantity: {item.quantity}</Text>
        {item.notes ? (
          <Text style={styles.cartItemNotes}>Notes: {item.notes}</Text>
        ) : null}
      </View>
    </View>
  );

  // Render UI
  return (
    <ImageBackground
      source={require("../assets/fondo2.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.heading}>Shopping Basket</Text>

        {/* List of cart items */}
        <FlatList
          data={cart}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.cartList}
        />

        {/* Button to navigate to payment screen */}
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => navigation.navigate("Payment")}
        >
          <Text style={styles.paymentButtonText}>Go to Pay</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fc4b08",
    textAlign: "center",
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
