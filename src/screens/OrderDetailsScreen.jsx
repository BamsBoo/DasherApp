import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { acceptOrder } from '../services/orderService';

const OrderDetailsScreen = ({ route, navigation }) => {
  const { order } = route.params;
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    try {
      setLoading(true);

      const updatedOrder = await acceptOrder(order.id);

      Alert.alert('Success', 'Delivery Accepted!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Order Details</Text>

  {/* Empty view to balance spacing */}
      <View style={{ width: 24 }} />
      </View>

        {/* Customer Info */}
     <View style={styles.card}>
        <Text style={styles.sectionTitle}>Customer Name</Text>
        <Text style={styles.bold}>{order.customer?.name || 'No customer name'}</Text>
     </View>
      
      {/* Pickup Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Pickup</Text>
        <Text style={styles.bold}>{order.restaurant.name}</Text>
        <Text>{order.restaurant.address}</Text>
      </View>

      {/* Dropoff Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Drop-off</Text>
        <Text style={styles.bold}>{order.customer.name}</Text>
        <Text>{order.customer.address}</Text>
        <Text style={styles.note}>
          Notes: {order.customer.deliveryNotes || 'None'}
        </Text>
      </View>

      {/* Items Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Items</Text>
        {order.items.map((item, index) => (
          <Text key={index} style={styles.itemText}>
            • {item.quantity}x {item.name}
          </Text>
        ))}
      </View>
      

      {/* Accept Button */}
      <TouchableOpacity
        style={styles.acceptButton}
        onPress={handleAccept}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.acceptText}>Accept Delivery</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8fafc',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#0f172a',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 6,
  },
  bold: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1e293b',
  },
  note: {
    marginTop: 6,
    fontStyle: 'italic',
    color: '#475569',
  },
  itemText: {
    fontSize: 15,
    marginBottom: 4,
    color: '#334155',
  },
  acceptButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  acceptText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
 header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 20,
},

headerTitle: {
  fontSize: 20,
  fontWeight: '700',
  color: '#0f172a',
},

backText: {
  fontSize: 30,
  fontWeight: '700',
  color: '#0f172a',
},
});