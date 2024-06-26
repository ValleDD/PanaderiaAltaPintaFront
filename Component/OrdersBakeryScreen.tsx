import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

// Initial dummy orders data
const initialOrders = [
  {
    id: 12345,
    clientName: "Juan Pérez",
    products: [
      { name: "Pan Integral", quantity: 2 },
      { name: "Pan Blanco", quantity: 1 },
    ],
    done: false,
  },
  {
    id: 12346,
    clientName: "María López",
    products: [{ name: "Pan de Avena", quantity: 3 }],
    done: false,
  },
];

// Functional component for displaying bakery orders
const OrdersBakeryScreen = () => {
  // State to manage orders
  const [orders, setOrders] = useState(initialOrders);

  // Function to toggle the status of an order (done/pending)
  const toggleOrderDone = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, done: !order.done } : order
      )
    );
  };

  return (
    <ImageBackground
      source={require("../assets/fondo2.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Pedidos Pendientes</Text>

        {/* List of orders */}
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.orderContainer,
                { backgroundColor: item.done ? "#C1E1C5" : "white" },
              ]}
              onPress={() => toggleOrderDone(item.id)}
            >
              {/* Order ID */}
              <Text style={styles.orderId}>ID del Pedido: {item.id}</Text>

              {/* Client Name */}
              <Text style={styles.clientName}>
                Nombre del Cliente: {item.clientName}
              </Text>

              {/* Products */}
              <Text style={styles.productsTitle}>Productos:</Text>
              {item.products.map((product, index) => (
                <Text key={index} style={styles.productItem}>
                  - {product.name} x {product.quantity}
                </Text>
              ))}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ImageBackground>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    textAlign: "center",
  },
  orderContainer: {
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
    elevation: 2,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  clientName: {
    fontSize: 16,
    marginBottom: 10,
  },
  productsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default OrdersBakeryScreen;
