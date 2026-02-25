import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderCard from '../components/OrderCard';
import { useOrdersStore } from '../store/ordersStore';

const AvailableOrdersScreen = ({ navigation }) => {
  const orders = useOrdersStore(state => state.availableOrders);

  const handleOrderPress = (order) => {
    navigation.navigate('OrderDetails', { order });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.screenTitle}>Available Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <OrderCard order={item} onPress={() => handleOrderPress(item)} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No orders available</Text>
            <Text style={styles.emptySubtitle}>
              New orders will appear here when customers place requests nearby.
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default AvailableOrdersScreen;

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
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    marginBottom: 14,
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
  cardInner: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  restaurantLogo: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  payoutBlock: {},
  payoutLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 2,
  },
  payoutValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#15803d',
  },
  currency: {
    fontSize: 15,
    fontWeight: '600',
    color: '#15803d',
  },
  distanceBlock: {
    alignItems: 'flex-end',
  },
  distanceValue: {
    fontSize: 17,
    fontWeight: '600',
    color: '#334155',
  },
  timeValue: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  chevronContainer: {
    paddingLeft: 12,
  },
  chevron: {
    fontSize: 28,
    color: '#94a3b8',
    fontWeight: '300',
  },

  // Loading / Error / Empty
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#64748b',
  },
  errorText: {
    fontSize: 17,
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  retryBtn: {
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 120,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 22,
  },
});


