import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
  TextInput,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const BakeryHomeScreen: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [newProductName, setNewProductName] = useState<string>("");
  const [newProductPrice, setNewProductPrice] = useState<string>("");
  const [newProductDescription, setNewProductDescription] =
    useState<string>("");
  const [newProductType, setNewProductType] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://172.16.103.80:3001/api/product/list");
      if (!response.ok) {
        throw new Error("Error al obtener la lista de productos");
      }
      const data = await response.json();
      const verifiedData = data.map((product: any, index: number) => ({
        ...product,
        id: product.id ? product.id.toString() : index.toString(),
      }));
      setProducts(verifiedData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAddProduct = async () => {
    if (
      newProductName &&
      newProductPrice &&
      newProductDescription &&
      newProductType
    ) {
      try {
        const response = await fetch(
          "http://172.16.103.80:3001/api/product/create",
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
              idUsuario: "1",
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Error al agregar producto");
        }

        const data = await response.json();
        console.log(data.message);
        fetchProducts();
        setNewProductName("");
        setNewProductPrice("");
        setNewProductDescription("");
        setNewProductType("");
        setImage(null);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleRemoveProduct = async (productId: string) => {
    try {
      const response = await fetch(
        `http://192.168.1.38:3001/api/product/delete/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
      console.log("Producto eliminado correctamente");
    } catch (error) {
      console.error(error.message);
    }
  };

  const pickImage = async () => {
    let result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })) as ImagePicker.ImagePickerResult;

    if (!result.cancelled) {
      setImage(result.uri);
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
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.imagePicker}>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
              )}
              <Text style={styles.imagePickerText}>Seleccionar imagen</Text>
            </View>
          </TouchableOpacity>
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
  imagePicker: {
    alignItems: "center",
    marginBottom: 10,
  },
  imagePickerText: {
    marginTop: 10,
    color: "black",
  },
  fondito: {
    opacity: 0.8,
    borderRadius: 12,
  },
});

export default BakeryHomeScreen;
