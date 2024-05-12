import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Ejemplo de datos de pedidos pendientes
const initialOrders = [
  { id: 1, productName: 'Pan de trigo', note: 'Sin azúcar', quantity: 2 },
  { id: 2, productName: 'Croissant', note: 'Con mantequilla extra', quantity: 1 },
];

const OrdersBakeryScreen = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const toggleOrderSelection = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const isSelected = (orderId) => selectedOrders.includes(orderId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos Pendientes</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, { flex: 1 }]}>Producto</Text>
        <Text style={[styles.headerText, { flex: 1 }]}>Nota</Text>
        <Text style={[styles.headerText, { flex: 1 }]}>Cantidad</Text>
        <Text style={[styles.headerText, { flex: 1 }]}></Text>
      </View>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleOrderSelection(item.id)}>
            <View style={styles.orderItem}>
              
              <Text style={styles.itemText}>{item.productName}</Text>
              <Text style={styles.itemText}>{item.note}</Text>
              <Text style={styles.itemText}>{item.quantity}</Text>
              <View style={[styles.selectionIndicator, { backgroundColor: isSelected(item.id) ? '#007bff' : 'transparent' }]} />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    margin: 10
   // backgroundColor: '#FFF9EE', // Fondo del contenedor principal
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center', // Centrar el texto
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10, // Añadir espacio horizontal
    backgroundColor: 'white', // Fondo del encabezado de la tabla
    paddingVertical: 10, // Añadir espacio vertical
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    textAlign: 'center', // Centrar el texto
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    width: '100%',
    backgroundColor: 'white', // Fondo del item
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: 'black', // Color del texto
    backgroundColor: 'white', // Fondo del itemText
    paddingHorizontal: 10, // Añadir espacio horizontal
    paddingVertical: 5, // Añadir espacio vertical
    borderRadius: 5, // Bordes redondeados
  },
  selectionIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    //borderColor: 'white',
    marginRight: 10,
  },
});
 
export default OrdersBakeryScreen;

