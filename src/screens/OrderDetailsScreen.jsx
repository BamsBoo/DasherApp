import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOrdersStore } from '../store/ordersStore';

const OrderDetailsScreen = ({ route, navigation }) => {
  const { order } = route.params;
  const acceptOrder = useOrdersStore(state => state.acceptOrder);
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
  try {
    setLoading(true);

    acceptOrder(order.id);

    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'ActiveDelivery' }],
      });
      setLoading(false);
    }, 1500); // 1.5 second delay (adjust as needed)

  } catch (e) {
    setLoading(false);
    Alert.alert('Error', e.message);
  }
};

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <Text style={styles.screenTitle}>Order Details</Text>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Customer */}
         <View style={styles.card}>
         <Text style={styles.sectionLabel}>Customer</Text>
         <Text style={styles.sectionValue}>
             {order.customer?.name || 'Unknown customer'}
         </Text>
        </View>
        
        {/* Pickup */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Pickup</Text>
          <Text style={styles.sectionValue}>{order.restaurant?.name}</Text>
          <Text style={styles.subText}>{order.restaurant?.address}</Text>
        </View>

         {/* Items */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Items to Pick Up</Text>

          {order.items?.length ? (
            order.items.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <Text style={styles.itemQty}>{item.quantity}x {item.name}</Text>
              </View> 
            ))
          ) : (
            <Text style={styles.subText}>No item details provided</Text>
          )}
          <Text style={styles.sectionValue}>Total: PHP {order.payout}</Text>
        </View>
        
        

        {/* Drop-off */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Drop-off</Text>
          <Text style={styles.sectionValue}>{order.customer?.address}</Text>
          <Text style={styles.subText}>{order.customer?.deliveryNotes}</Text>
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
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },

  /* Header (same as Available Orders) */
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e8f0',
  },

  content: {
    padding: 16,
    paddingBottom: 24,
  },

  /* Card */
  card: {
    marginBottom: 14,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },

  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 4,
  },
  sectionValue: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1e293b',
  },
  subText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },

  /* Button */
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
  itemPrice: {
  fontSize: 14,
  fontWeight: '600',
  color: '#0f172a',
},

});