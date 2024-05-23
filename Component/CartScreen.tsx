import React from 'react';
import { View, Text, SectionList, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CartScreen = ({ cart = [], navigation }) => {
  // Agrupar los elementos del carrito por fecha
  const groupedCart = cart.reduce((acc, item) => {
    const date = item.date || 'Sin fecha'; // Manejar el caso donde no hay fecha
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Crear secciones para la SectionList
  const sections = Object.keys(groupedCart).map(date => ({
    title: date,
    data: groupedCart[date]
  }));

  // Renderizar cada elemento del carrito
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={styles.cartItemTextContainer}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>{item.price}</Text>
        <Text style={styles.cartItemQuantity}>Cantidad: {item.quantity}</Text>
        {item.notes ? <Text style={styles.cartItemNotes}>Notas: {item.notes}</Text> : null}
      </View>
    </View>
  );

  // Renderizar el encabezado de cada sección
  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cesta de la compra</Text>
      <SectionList
        sections={sections}
        renderItem={renderCartItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cartList}
      />
      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => navigation.navigate('Payment')}
      >
        <Text style={styles.paymentButtonText}>Ir a Pagar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartList: {
    paddingBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#eee',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cartItemImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  cartItemTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "black",
  },
  cartItemPrice: {
    fontSize: 14,
    color: 'black',
  },
  cartItemQuantity: {
    fontSize: 14,
    color: 'black',
  },
  cartItemNotes: {
    fontSize: 14,
    color: 'gray',
  },
  paymentButton: {
    padding: 15,
    backgroundColor: '#fa560b',
    borderRadius: 25,
    alignItems: 'center',
    margin: 20,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;

