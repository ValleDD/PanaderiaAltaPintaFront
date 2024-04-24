import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";

const ClientHomeScreen = () => {
  // Datos de ejemplo de productos
  const products = [
    { id: "1", name: "Producto 1", price: "$10", image: require("../assets/producto1.jpg") },
    { id: "2", name: "Producto 2", price: "$20", image: require("../assets/producto1.jpg") },
    { id: "3", name: "Producto 3", price: "$15", image: require("../assets/producto1.jpg") },
    { id: "4", name: "Producto 4", price: "$25", image: require("../assets/producto1.jpg") },
    { id: "5", name: "Producto 5", price: "$18", image: require("../assets/producto1.jpg") },
    { id: "6", name: "Producto 6", price: "$30", image: require("../assets/producto1.jpg") },
    // Agrega más productos según sea necesario
  ];

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productContainer}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productTextContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
      style={styles.flastlist}
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
    backgroundColor: "#fff",
  },
  productList: {
    paddingHorizontal: 10,
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop:48
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 5,
  },
  productTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#666",
  },
  flastlist:{
    width: 380,
   
  }
});

export default ClientHomeScreen;