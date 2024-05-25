import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
} from "react-native";

const BakeryHomeScreen = () => {
  // State variables to manage product data and form inputs
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductType, setNewProductType] = useState("");
  const [newProductImagenURL, setNewProductImagenURL] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);
  // Fetch products when component mounts
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://192.168.1.38:3001/api/product/list");
      const data = await response.json();
      if (response.ok) {
        const verifiedData = data.map((product, index) => ({
          ...product,
          id: product.id ? product.id.toString() : index.toString(),
        }));
        setProducts(verifiedData);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error al obtener la lista de productos:", error);
    }
  };
  // Handle adding a new product
  const handleAddProduct = async () => {
    if (
      newProductName &&
      newProductPrice &&
      newProductDescription &&
      newProductType
    ) {
      try {
        const response = await fetch(
          "http://192.168.1.38:3001/api/product/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Nombre: newProductName,
              descripcion: newProductDescription,
              precio: parseFloat(newProductPrice),
              tipo: newProductType,
              idUsuario: "1"
            }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          console.log(data.message);
          fetchProducts();
          setNewProductName("");
          setNewProductPrice("");
          setNewProductDescription("");
          setNewProductType("");
          setNewProductImagenURL("");
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error al agregar producto:", error);
      }
    }
};

// Handle removing a product
const handleRemoveProduct = async (productId) => {
  try {
    const response = await fetch(
      `http://192.168.1.38:3001/api/product/delete/${productId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
      console.log("Product deleted successfully");
    } else {
      const errorMessage = await response.json();
      console.error(errorMessage.message);
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
  }
};


  return (
    <ImageBackground
      source={require("../assets/fondo2.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Productos Actuales</Text>
        <FlatList
          style={styles.fondito}
          data={products}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Text style={styles.text}>
                {item.Nombre} - {item.precio}€
              </Text>
              <TouchableOpacity onPress={() => handleRemoveProduct(item.id)}>
                <Text style={styles.removeButton}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <Text style={styles.text1}>AÑADIR PRODUCTO</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del nuevo producto"
            onChangeText={setNewProductName}
            value={newProductName}
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.input}
            placeholder="Precio del nuevo producto"
            onChangeText={setNewProductPrice}
            value={newProductPrice}
            keyboardType="numeric"
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción del nuevo producto"
            onChangeText={setNewProductDescription}
            value={newProductDescription}
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.input}
            placeholder="Tipo del nuevo producto"
            onChangeText={setNewProductType}
            value={newProductType}
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.input}
            placeholder="URL de la imagen del nuevo producto"
            onChangeText={setNewProductImagenURL}
            value={newProductImagenURL}
            placeholderTextColor="black"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
          <Text style={[styles.buttonText, { color: "white" }]}>
            Agregar Producto
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "white",
    padding: 5,
  },
  removeButton: {
    color: "red",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "black",
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: "black",
  },
  button: {
    backgroundColor: "#7F5232",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "bold",
  },
  text: {
    color: "black",
    fontSize: 18,
  },
  text1: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    opacity: 0.96,
  },
  fondito: {
    opacity: 0.8,
    borderRadius: 12,
  },
});

export default BakeryHomeScreen;
