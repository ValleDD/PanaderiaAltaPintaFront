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

const ClientHomeScreen = ({ navigation }) => {
  const [sweets, setSweets] = useState([]);
  const [salty, setSalty] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("dulce"); // Categoría por defecto
  const [quantity, setQuantity] = useState(0);
  const [productNotes, setProductNotes] = useState({});
  const [cartItems, setCartItems] = useState([]); // Cambiado para manejar los productos en el carrito

  // Fetch products when the selected category changes
  useEffect(() => {
    fetchProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await axios.get(
        `http://192.168.1.38:3001/api/product/${category}`
      );
      const data = response.data;

      // Check if data is valid and set state accordingly
      if (Array.isArray(data)) {
        if (category === "dulce") {
          setSweets(data);
        } else if (category === "salado") {
          setSalty(data);
        }
      } else {
        console.error(`Unexpected data format for "${category}":`, data);
      }
    } catch (error) {
      console.error(`Error fetching "${category}" products:`, error);
    }
  };

  const handleAddToCart = (product) => {
    if (quantity > 0) {
      // Crear una copia del carrito
      const newCartItems = [...cartItems];
      const existingItemIndex = newCartItems.findIndex(item => item.idProducto === product.idProducto);

      if (existingItemIndex !== -1) {
        // Si el producto ya existe en el carrito, incrementar la cantidad
        newCartItems[existingItemIndex].cantidad += quantity;
      } else {
        // Si no existe, agregar el producto al carrito
        newCartItems.push({
          ...product,
          cantidad: quantity,
          nota: productNotes[product.idProducto] || "", // Añadir nota si existe
        });
      }

      setCartItems(newCartItems); // Actualizar el carrito
      setQuantity(0); // Reiniciar la cantidad después de agregar al carrito
    }
  };

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleNoteChange = (productId, note) => {
    setProductNotes((prevNotes) => ({ ...prevNotes, [productId]: note }));
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image
        source={item.imagenUrl ? { uri: item.imagenUrl } : defaultProductImage}
        style={styles.productImage}
      />
      <View style={styles.productTextContainer}>
        <Text style={styles.productName}>{item.nombre}</Text>
        <Text style={styles.productPrice}>{item.precio}€</Text>
        <TextInput
          style={styles.noteInput}
          placeholder="Nota producto..."
          onChangeText={(note) => handleNoteChange(item.idProducto, note)}
          value={productNotes[item.idProducto] || ""}
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
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.addButtonLabel}>Añadir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleViewCartPress = () => {
    navigation.navigate("Your Cart", {
      cartItems: cartItems, // Enviar productos del carrito
    });
  };

  return (
    <ImageBackground
      source={require("../assets/fondo2.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Buscar producto..."
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>

        <View style={styles.productOption}>
          <TouchableOpacity onPress={() => setSelectedCategory("dulce")}>
            <Text
              style={[
                styles.category,
                selectedCategory === "dulce" && styles.selectedCategory,
              ]}
            >
              Dulce
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedCategory("salado")}>
            <Text
              style={[
                styles.category,
                selectedCategory === "salado" && styles.selectedCategory,
              ]}
            >
              Salado
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.flatlist}
          data={selectedCategory === "dulce" ? sweets : salty}
          renderItem={renderProductItem}
          keyExtractor={(item, index) =>
            item.idProducto ? item.idProducto.toString() : index.toString()
          }
          contentContainerStyle={styles.productList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />

        <TouchableOpacity
          style={styles.viewCartButton}
          onPress={handleViewCartPress}
        >
          <Text style={styles.viewCartButtonText}>
            Carrito ({cartItems.reduce((total, item) => total + item.cantidad, 0)}) {/* Mostrar la cantidad total en el carrito */}
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
  productTextContainer: {
    flex: 1,
    marginLeft: 10,
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
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 10,
    marginRight: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "green",
  },
  addButton: {
    backgroundColor: "#fa560b",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButtonLabel: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ClientHomeScreen;
