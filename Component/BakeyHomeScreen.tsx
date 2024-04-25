import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

// Ejemplo de datos de productos
const initialProducts = [
  { id: 1, name: 'Pan de trigo', price: 2.5 },
  { id: 2, name: 'Pan de centeno', price: 3.0 },
  { id: 3, name: 'Croissant', price: 1.5 },
];

// Ejemplo de datos de pedidos pendientes
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
    <View style={styles.container}>
      <Text style={styles.title}>Productos Actuales</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text>{item.name} - ${item.price}</Text>
            <TouchableOpacity onPress={() => handleRemoveProduct(item.id)}>
              <Text style={styles.removeButton}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del nuevo producto"
        onChangeText={setNewProductName}
        value={newProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio del nuevo producto"
        onChangeText={setNewProductPrice}
        value={newProductPrice}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Agregar Producto</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
    color: 'white',
    fontWeight: 'bold',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  completeButton: {
    color: 'green',
  },
});

export default BakeryHomeScreen;