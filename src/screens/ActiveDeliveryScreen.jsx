import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getActiveOrder, updateActiveOrderStatus } from '../store/ordersStore';

const ActiveDeliveryScreen = ({ navigation }) => {
  const [order, setOrder] = useState(getActiveOrder());

  if (!order) {
    return (
      <SafeAreaView style={styles.center} edges={['top', 'left', 'right']}>
        <Text style={styles.emptyTitle}>No active delivery</Text>
        <Text style={styles.emptySubtitle}>
          Accept an order to start delivering.
        </Text>
      </SafeAreaView>
    );
  }

  const handlePrimaryAction = () => {
    try {
      const updatedOrder = updateActiveOrderStatus();

      if (!updatedOrder) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'AvailableOrders' }],
        });
        return;
      }

      setOrder({ ...updatedOrder });
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  const buttonLabel =
    order.status === 'accepted' ? 'Confirm Pickup' : 'Complete Delivery';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <Text style={styles.screenTitle}>Active Delivery</Text>

      {/* Order Card */}
      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Order</Text>
        <Text style={styles.sectionValue}>#{order.id}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionLabel}>Pickup</Text>
        <Text style={styles.sectionValue}>{order.restaurant?.name}</Text>
        <Text style={styles.subText}>{order.restaurant?.address}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionLabel}>Drop-off</Text>
        <Text style={styles.sectionValue}>{order.customer?.name}</Text>
        <Text style={styles.subText}>{order.customer?.address}</Text>

        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Status</Text>
          <Text style={styles.statusValue}>{order.status}</Text>
        </View>
      </View>

      {/* Primary Action */}
      <TouchableOpacity style={styles.primaryBtn} onPress={handlePrimaryAction}>
        <Text style={styles.primaryText}>{buttonLabel}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ActiveDeliveryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
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

  /* Card */
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
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

  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 14,
  },

  statusRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  statusValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#15803d',
    textTransform: 'capitalize',
  },

  /* Primary Button */
  primaryBtn: {
    marginHorizontal: 16,
    marginTop: 'auto',
    marginBottom: 24,
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  /* Empty State */
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#f5f7fa',
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
});