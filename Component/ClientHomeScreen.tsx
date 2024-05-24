import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import axios from "axios";
const defaultProductImage = require("../assets/producto1.jpg");

const ClientHomeScreen = ({ navigation, cart = [], setCart }) => {
  // State variables to manage product data, search query, selected category, selected product, quantity, and product notes
  const [sweets, setSweets] = useState([]);
  const [salty, setSalty] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [productNotes, setProductNotes] = useState({}); // State to store product notes

  // Fetch products based on the selected category
  useEffect(() => {
    if (selectedCategory === "Dulce" || selectedCategory === "Salado") {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  // Fetch products from the server based on category
  const fetchProductsByCategory = async (category) => {
    try {
      const response = await axios.get(
        `http://192.168.1.38:3001/api/product/${category}`
      );
      const data = response.data;
      if (category === "Dulce") {
        setSweets(data);
      } else if (category === "Salado") {
        setSalty(data);
      }
    } catch (error) {
      console.error(`Error fetching "${category}" products:`, error);
    }
  };

  // Add product to cart and send request to server to create the order
  const handleAddToCart = async (product) => {
    if (product) {
      const updatedCart = [...cart];
      const existingItemIndex = updatedCart.findIndex(
        (cartItem) => cartItem.id === product.id
      );

      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += quantity;
      } else {
        updatedCart.push({ ...product, quantity });
      }

      setCart(updatedCart);
      setQuantity(0);

      try {
        const response = await axios.post(
          "http://192.168.1.38:3001/api/pedido/create",
          {
            productId: product.id,
            quantity,
            note: productNotes[product.id], // Include product note
            // Other relevant product data you may need for the order
          }
        );

        console.log("Order created successfully:", response.data);
      } catch (error) {
        console.error("Error creating order:", error);
      }
    }
  };

  // Increment product quantity
  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Decrement product quantity
  const handleDecrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  // Handle product note change
  const handleNoteChange = (productId, note) => {
    setProductNotes({ ...productNotes, [productId]: note });
  };

  // Render individual product item
  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image
        source={item.imagenURL ? { uri: item.imagenURL } : defaultProductImage}
        style={styles.productImage}
      />
      <View style={styles.productTextContainer}>
        <Text style={styles.productName}>{item.Nombre}</Text>
        <Text style={styles.productPrice}>{item.precio}</Text>
        <TextInput
          style={styles.noteInput}
          placeholder="Add note to product..."
          onChangeText={(note) => handleNoteChange(item.id, note)}
          value={productNotes[item.id] || ""}
        />
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={handleDecrementQuantity}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={handleIncrementQuantity}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setSelectedProduct(item);
            handleAddToCart(item);
          }}
        >
          <Text style={styles.addButtonLabel}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require("../assets/fondo2.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Search bar */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search products..."
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>

        {/* Product category selection */}
        <View style={styles.productOption}>
          <TouchableOpacity onPress={() => setSelectedCategory("Dulce")}>
            <Text
              style={[
                styles.category,
                selectedCategory === "Dulce" && styles.selectedCategory,
              ]}
            >
              Dulce
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedCategory("Salado")}>
            <Text
              style={[
                styles.category,
                selectedCategory === "Salado" && styles.selectedCategory,
              ]}
            >
              Salado
            </Text>
          </TouchableOpacity>
        </View>

        {/* Product list */}
        <FlatList
          style={styles.flatlist}
          data={selectedCategory === "Dulce" ? sweets : salty}
          renderItem={renderProductItem}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          contentContainerStyle={styles.productList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />

        {/* View cart button */}
        <TouchableOpacity
          style={styles.viewCartButton}
          onPress={() => navigation.navigate("Cart")}
        >
          <Text style={styles.viewCartButtonText}>
            View Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  searchBarContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 20,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
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
    color: "black",
  },
  productPrice: {
    fontSize: 14,
    color: "black",
  },
  noteInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "white",
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 20,
    color: "black",
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  addButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: 5,
    marginLeft: 10,
  },
  addButtonLabel: {
    color: "#fff",
    fontSize: 16,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  flatlist: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "white",
    opacity: 0.8,
  },
  viewCartButton: {
    padding: 15,
    backgroundColor: "#fa560b",
    borderRadius: 25,
    alignItems: "center",
    margin: 20,
  },
  viewCartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  productOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  category: {
    fontSize: 23,
    color: "#fa560b",
    fontWeight: "bold",
  },
  selectedCategory: {
    borderBottomWidth: 2,
    borderColor: "#fa560b",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 5,
  },
});

export default ClientHomeScreen;
