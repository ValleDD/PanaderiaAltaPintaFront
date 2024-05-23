import React, { useState } from "react";
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

const ClientHomeScreen = ({ navigation, cart = [], setCart }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [quantities, setQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("Pan");

  const products = [
    { id: '1', name: 'Pan Integral', price: '2.50€', image: require('../assets/producto1.jpg'), category: 'Pan' },
    { id: '2', name: 'Dulce de Leche', price: '3.00€', image: require('../assets/bollosChocolate.jpg'), category: 'Dulce' },
    { id: '3', name: 'Pan de Molde', price: '2.00€', image: require('../assets/producto1.jpg'), category: 'Pan' },
    { id: '4', name: 'Dulce de Fresa', price: '3.50€', image: require('../assets/bollosChocolate.jpg'), category: 'Dulce' },
  ];

  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer1}>
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
        placeholderTextColor="black"
        onChangeText={(text) => handleNotesChange(item, text)}
        value={getProductNotes(item)}
      />
    </View>
  );

  const addToCart = (product) => {
    const quantity = getProductQuantity(product);
    
    // Obtener la fecha actual y formatearla como dd-mm-yyyy
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // getMonth() retorna 0-11, por lo que sumamos 1
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
  
    if (quantity > 0) {
      const productInCart = cart.find(item => item.id === product.id);
      if (productInCart) {
        const updatedCart = cart.map(item => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
        setCart(updatedCart);
      } else {
        setCart([...cart, { ...product, quantity, notes: "", date: formattedDate }]);
      }
      setQuantities({ ...quantities, [product.id]: 0 });
    }
  };

  const incrementQuantity = (product) => {
    const currentQuantity = getProductQuantity(product);
    setQuantities({ ...quantities, [product.id]: currentQuantity + 1 });
  };

  const decrementQuantity = (product) => {
    const currentQuantity = getProductQuantity(product);
    if (currentQuantity > 0) {
      setQuantities({ ...quantities, [product.id]: currentQuantity - 1 });
    }
  };

  const getProductQuantity = (product) => {
    return quantities[product.id] || 0;
  };

  const handleNotesChange = (product, text) => {
    const updatedCart = cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, notes: text };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const getProductNotes = (product) => {
    const cartItem = cart.find((item) => item.id === product.id);
    return cartItem ? cartItem.notes : "";
  };

  const filterProductsByCategory = () => {
    return products.filter(product =>
      product.category === selectedCategory &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
            placeholder="Buscar productos..."
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
        <View style={styles.productOption}>
          <TouchableOpacity onPress={() => setSelectedCategory("Pan")}>
            <Text style={styles.productLetter}>Pan</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedCategory("Dulce")}>
            <Text style={styles.productLetter}>Dulce</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flatlistContainer}>
          <FlatList
            style={styles.flatlist}
            data={filterProductsByCategory()}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.productList}
          />
        </View>
        <TouchableOpacity
          style={styles.viewCartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.viewCartButtonText}>Ver Cesta ({cart.reduce((total, item) => total + item.quantity, 0)})</Text>
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
    borderRadius: 20
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
  productContainer1: {
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
    color: 'black',
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
    color: "black",
  },
  notesInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    color: "black",
  },
  flatlistContainer: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'white'
  },
  flatlist: {
    flex: 1,
    borderRadius: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    opacity: 0.9,
  },
  productOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  productLetter: {
    fontSize: 23,
    color: '#fa560b',
    fontWeight: 'bold',
  },
  viewCartButton: {
    padding: 15,
    backgroundColor: '#fa560b',
    borderRadius: 25,
    alignItems: 'center',
    margin: 20,
  },
  viewCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ClientHomeScreen;
