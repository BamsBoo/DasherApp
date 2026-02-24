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
import { acceptOrder } from '../services/acceptOrder';

const OrderDetailsScreen = ({ route, navigation }) => {
  const { order } = route.params;
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    try {
      setLoading(true);

      const updatedOrder = await acceptOrder(order.id);

      Alert.alert('Success', 'Delivery Accepted!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('ActiveDelivery'); // ← change to your actual route name
            // navigation.goBack();                // optional – depending on your flow
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error?.message || 'Could not accept this order');
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

        <View style={{ width: 24 }} />
      </View>

      {/* Customer Info */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Customer</Text>
        <Text style={styles.bold}>{order.customer?.name || '—'}</Text>
      </View>

      {/* Pickup */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Pickup</Text>
        <Text style={styles.bold}>{order.restaurant?.name || '—'}</Text>
        <Text>{order.restaurant?.address || 'No address'}</Text>
      </View>

      {/* Dropoff */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Drop-off</Text>
        <Text style={styles.bold}>{order.customer?.name || '—'}</Text>
        <Text>{order.customer?.address || 'No address'}</Text>
        <Text style={styles.note}>
          Notes: {order.customer?.deliveryNotes || 'None'}
        </Text>
      </View>

      {/* Items */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Items</Text>
        {order.items?.length > 0 ? (
          order.items.map((item, index) => (
            <Text key={index} style={styles.itemText}>
              • {item.quantity}× {item.name}
              {item.notes ? ` (${item.notes})` : ''}
            </Text>
          ))
        ) : (
          <Text style={styles.itemText}>No items</Text>
        )}
      </View>

      {/* Accept Button */}
      <TouchableOpacity
        style={[styles.acceptButton, loading && styles.acceptButtonDisabled]}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  backText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#0f172a',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
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
    color: '#1e293b',
    marginBottom: 4,
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
    marginTop: 12,
  },
  acceptButtonDisabled: {
    backgroundColor: '#86efac',
    opacity: 0.7,
  },
  acceptText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});