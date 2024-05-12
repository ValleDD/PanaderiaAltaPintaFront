import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";

const ClientHomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]); // Estado para mantener los productos añadidos al carrito

  const products = [
    { id: "1", name: "Producto 1", price: "10€", image: require("../assets/producto1.jpg") },
    { id: "2", name: "Producto 2", price: "20€", image: require("../assets/producto1.jpg") },
    { id: "3", name: "Producto 3", price: "15€", image: require("../assets/producto1.jpg") },
    { id: "4", name: "Producto 4", price: "25€", image: require("../assets/producto1.jpg") },
    { id: "5", name: "Producto 5", price: "18€", image: require("../assets/producto1.jpg") },
    { id: "6", name: "Producto 6", price: "30€", image: require("../assets/producto1.jpg") },
  ];

  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productTextContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={() => decrementQuantity(item)}>
            <Text style={styles.counterButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>{getProductQuantity(item)}</Text>
          <TouchableOpacity onPress={() => incrementQuantity(item)}>
            <Text style={styles.counterButton}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => addToCart(item)}>
          <Text style={styles.addButton}>Añadir</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.notesInput}
        placeholder="Añadir notas..."
        placeholderTextColor="#fff"
        onChangeText={(text) => handleNotesChange(item, text)}
        value={getProductNotes(item)}
      />
    </View>
  );
  

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1, notes: '' }]);
  };

  const incrementQuantity = (product) => {
    const updatedCart = cart.map(item => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decrementQuantity = (product) => {
    const updatedCart = cart.map(item => {
      if (item.id === product.id && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const getProductQuantity = (product) => {
    const cartItem = cart.find(item => item.id === product.id);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleNotesChange = (product, text) => {
    const updatedCart = cart.map(item => {
      if (item.id === product.id) {
        return { ...item, notes: text };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const getProductNotes = (product) => {
    const cartItem = cart.find(item => item.id === product.id);
    return cartItem ? cartItem.notes : '';
  };

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
      <View style={styles.flatlistContainer}>
        <FlatList
          style={styles.flatlist}
          data={products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    margin: 5
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
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  addButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: 5,
    marginRight: 10,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  counterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "white",
    color: "black",
    borderRadius: 5,
  },
  counterText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "white",
  },
  notesInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    color: "white",
  },
  flatlistContainer: {
    flex: 1,
    marginTop: 10,
  },
  flatlist: {
    flex: 1,
  },
});

export default ClientHomeScreen;
