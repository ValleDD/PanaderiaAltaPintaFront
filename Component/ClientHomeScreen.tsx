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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [productNotes, setProductNotes] = useState({});

  useEffect(() => {
    fetchProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  const fetchProductsByCategory = async (category) => {
    try {
      if(!category){
        console.error("Category is empty!");
      }
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

  const handleAddToCart = async (product) => {
    // Add your logic to add product to cart
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
    setProductNotes({ ...productNotes, [productId]: note });
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image
        source={item.imagenURL ? { uri: item.imagenURL } : defaultProductImage}
        style={styles.productImage}
      />
      <View style={styles.productTextContainer}>
        <Text style={styles.productName}>{item.Nombre}</Text>
        <Text style={styles.productPrice}>{item.precio}€</Text>
        <TextInput
          style={styles.noteInput}
          placeholder="Nota prodcuto..."
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
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.addButtonLabel}>Añadir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  const handleViewCartPress = () => {
    navigation.navigate("Your Cart");
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

        <TouchableOpacity
          style={styles.viewCartButton}
          onPress={handleViewCartPress}
        >
          <Text style={styles.viewCartButtonText}>Carrito</Text>
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
  // Estilos actualizados para el producto
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff", // Nuevo fondo blanco
    borderRadius: 10, // Bordes redondeados
    shadowColor: "#000", // Sombra
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
    borderRadius: 10, // Bordes redondeados
    marginRight: 10, // Margen a la derecha para separar la imagen del texto
  },
  productName: {
    fontSize: 18, // Tamaño del texto aumentado
    fontWeight: "bold",
    marginBottom: 2,
    color: "black",
  },
  productPrice: {
    fontSize: 16, // Tamaño del texto aumentado
    color: "#888", // Color de texto más suave
  },
  // Estilos actualizados para el botón de añadir al carrito
  addButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#007bff",
    borderRadius: 20, // Bordes más redondeados
  },
  addButtonLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ClientHomeScreen;
