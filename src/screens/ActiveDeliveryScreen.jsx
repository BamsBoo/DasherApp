import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOrdersStore } from '../store/ordersStore';

const ActiveDeliveryScreen = ({ navigation }) => {
  const order = useOrdersStore(state => state.activeOrder);
  const updateStatus = useOrdersStore(state => state.updateActiveOrderStatus);

  if (!order) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.emptyTitle}>No active delivery</Text>
        <Text style={styles.emptySubtitle}>
          Accept an order to start delivering.
        </Text>
      </SafeAreaView>
    );
  }

  const handlePrimaryAction = () => {
    try {
      const updated = updateStatus();

      if (!updated) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'AvailableOrders' }],
        });
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const buttonLabel =
    order.status === 'accepted'
      ? 'Confirm Pickup'
      : 'Complete Delivery';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <Text style={styles.screenTitle}>Active Delivery</Text>

      <View style={styles.content}>
        {/* Order */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Order</Text>
          <Text style={styles.sectionValue}>#{order.id}</Text>
        </View>

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
          <Text style={styles.sectionValue}>
            {order.restaurant?.name}
          </Text>
          <Text style={styles.subText}>
            {order.restaurant?.address}
          </Text>
        </View>

        {/* Drop-off */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Drop-off</Text>
          <Text style={styles.sectionValue}>
            {order.customer?.address}
          </Text>

          {order.customer?.deliveryNotes ? (
            <Text style={styles.subText}>
              {order.customer.deliveryNotes}
            </Text>
          ) : null}
        </View>

        {/* Status */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Status</Text>
          <Text style={styles.statusText}>
            {order.status.toUpperCase()}
          </Text>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={handlePrimaryAction}
        >
          <Text style={styles.acceptText}>{buttonLabel}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ActiveDeliveryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#94a3b8',
    textAlign: 'center',
  },

  /* Header */
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

  statusText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#16a34a',
  },

  /* Button */
  acceptButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  acceptText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});