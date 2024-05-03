import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";

const ClientHomeScreen = () => {
  // Datos de ejemplo de productos
  const [searchQuery, setSearchQuery] = useState('');
  
  const products = [
    { id: "1", name: "Producto 1", price: "10€", image: require("../assets/producto1.jpg") },
    { id: "2", name: "Producto 2", price: "20€", image: require("../assets/producto1.jpg") },
    { id: "3", name: "Producto 3", price: "15€", image: require("../assets/producto1.jpg") },
    { id: "4", name: "Producto 4", price: "25€", image: require("../assets/producto1.jpg") },
    { id: "5", name: "Producto 5", price: "18€", image: require("../assets/producto1.jpg") },
    { id: "6", name: "Producto 6", price: "30€", image: require("../assets/producto1.jpg") },
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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar productos..."
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FlatList
        style={styles.flatlist}
        data={filteredProducts}
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
    backgroundColor: "#fff",
  },
  searchBarContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
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
  flatlist: {
    flex: 1,
  },
});

export default ClientHomeScreen;
