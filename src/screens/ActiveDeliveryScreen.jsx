// ActiveDeliveryScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getActiveOrder } from '../store/ordersStore';

const ActiveDeliveryScreen = () => {
  const order = getActiveOrder();

  if (!order) {
    return (
      <View style={styles.container}>
        <Text>No active delivery</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Delivery</Text>
      <Text>Order #{order.id}</Text>
      <Text>Customer: {order.customer?.name}</Text>
      <Text>To: {order.customer?.address}</Text>
      <Text>From: {order.restaurant?.name}</Text>
      {/* Add map, timer, complete button, etc. later */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ActiveDeliveryScreen;