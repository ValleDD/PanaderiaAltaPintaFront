import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

// Ejemplo de datos de pedidos pendientes
const initialOrders = [
    { id: 1, productName: 'Pan de trigo', quantity: 2 },
    { id: 2, productName: 'Croissant', quantity: 1 },
  ];

const OrdersEarringsScreen = () => {
    const [orders, setOrders] = useState(initialOrders);


    const handleMarkOrderAsCompleted = (orderId: number) => {
        const updatedOrders = orders.filter(order => order.id !== orderId);
        setOrders(updatedOrders);
      };
  return (
    <View>
        <Text style={styles.title}>Pedidos Pendientes</Text>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text>{item.productName} - Cantidad: {item.quantity}</Text>
            <TouchableOpacity onPress={() => handleMarkOrderAsCompleted(item.id)}>
              <Text style={styles.completeButton}>Marcar como Realizado</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}
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

export default OrdersEarringsScreen
