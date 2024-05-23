import { color } from '@rneui/themed/dist/config';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from 'react-native';


const initialProducts = [
  { id: 1, name: 'Pan de trigo', price: 2.5 },
  { id: 2, name: 'Pan de centeno', price: 3.0 },
  { id: 3, name: 'Croissant', price: 1.5 },
];


const initialOrders = [
  { id: 1, productName: 'Pan de trigo', quantity: 2 },
  { id: 2, productName: 'Croissant', quantity: 1 },
];

const BakeryHomeScreen: React.FC = () => {
  const [products, setProducts] = useState(initialProducts);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
 

  const handleAddProduct = () => {
    if (newProductName && newProductPrice) {
      const newProduct = {
        id: products.length + 1,
        name: newProductName,
        price: parseFloat(newProductPrice),
      };
      setProducts([...products, newProduct]);
      setNewProductName('');
      setNewProductPrice('');
    }
  };

  const handleRemoveProduct = (productId: number) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
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
            <Text  style={styles.text}>{item.name} - {item.price}€</Text>
            <TouchableOpacity onPress={() => handleRemoveProduct(item.id)}>
              <Text style={styles.removeButton}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <Text style={ styles.text1}>AÑADIR PRODUCTO</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del nuevo producto"
        onChangeText={setNewProductName}
        value={newProductName}
        placeholderTextColor="white" // Aquí se define el color del texto del placeholder
      />
      <TextInput
        style={styles.input}
        placeholder="Precio del nuevo producto"
        onChangeText={setNewProductPrice}
        value={newProductPrice}
        keyboardType="numeric"
        placeholderTextColor="white" // Aquí se define el color del texto del placeholder
      />
      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={[styles.buttonText, { color: 'white' }]}>Agregar Producto</Text>
      </TouchableOpacity>
      
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop:50
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: "white",
    padding:5
   
  },
  removeButton: {
    color: 'red',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    color: 'white'
  },
  completeButton: {
    color: 'green',
  },
  text:{
    color: 'black',
    fontSize: 23,
   
  }, 
  text1:{
    color: 'white',
    fontSize: 34,
    marginBottom: 23
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  // justifyContent: "center",
   // alignItems: "center",
   opacity: 0.96,
  },
  fondito:{
   
    opacity:0.8,
    borderRadius:12,
  
  }
});

export default BakeryHomeScreen;