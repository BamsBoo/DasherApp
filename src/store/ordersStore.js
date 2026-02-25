import { create } from 'zustand';
import ordersData from '../mock/mockOrders.json';

export const useOrdersStore = create((set, get) => ({
  availableOrders: ordersData.orders || ordersData || [],
  activeOrder: null,

  acceptOrder: (orderId) => {
    const { availableOrders, activeOrder } = get();

    if (activeOrder) {
      throw new Error('You already have an active delivery');
    }

    const index = availableOrders.findIndex(o => o.id === orderId);
    if (index === -1) throw new Error('Order not found');

    const order = { ...availableOrders[index], status: 'accepted' };

    set({
      activeOrder: order,
      availableOrders: availableOrders.filter(o => o.id !== orderId),
    });

    return order;
  },

  updateActiveOrderStatus: () => {
    const { activeOrder } = get();
    if (!activeOrder) throw new Error('No active order');

    if (activeOrder.status === 'accepted') {
      set({
        activeOrder: { ...activeOrder, status: 'Picked Up' },
      });
      return { ...activeOrder, status: 'Picked Up' };
    }

    if (activeOrder.status === 'Picked Up') {
      set({ activeOrder: null });
      return null; // completed
    }

    throw new Error('Invalid order state');
  },
}));