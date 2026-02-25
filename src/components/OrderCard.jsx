import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const OrderCard = ({ order, onPress }) => {
  const { restaurant, payout, currency = 'PHP', estimatedDistance, estimatedTime } = order;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 500); // delay card render

    return () => clearTimeout(timer);
  }, []);

  // Optional loading placeholder
  if (!ready) {
    return (
      <View style={[styles.card, styles.loadingCard]}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  const placeholderLogo = '';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      <View style={styles.cardInner}>
        <Image
          source={{ uri: restaurant?.logo || placeholderLogo }}
          style={styles.restaurantLogo}
          resizeMode="cover"
        />

        <View style={styles.cardContent}>
          <Text style={styles.restaurantName} numberOfLines={1}>
            {restaurant?.name || 'Unknown Restaurant'}
          </Text>

          <View style={styles.metaRow}>
            <View style={styles.payoutBlock}>
              <Text style={styles.payoutLabel}>PAYOUT</Text>
              <Text style={styles.payoutValue}>
                {payout} <Text style={styles.currency}>{currency}</Text>
              </Text>
            </View>

            <View style={styles.distanceBlock}>
              <Text style={styles.distanceValue}>
                {estimatedDistance ?? '—'} km
              </Text>
              {estimatedTime && (
                <Text style={styles.timeValue}>≈ {estimatedTime} min</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.chevronContainer}>
          <Text style={styles.chevron}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
    loadingCard: {
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
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