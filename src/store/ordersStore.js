// src/store/ordersStore.js
import ordersData from '../mocks/mockOrders.json';

const initialOrders = ordersData.orders || ordersData || [];

let availableOrders = [...initialOrders];
let activeOrder = null;

export const getAvailableOrders = () => availableOrders;
export const getActiveOrder = () => activeOrder;

/**
 * Accept order → move from available → active
 */
export const acceptOrderAction = (orderId) => {
  const index = availableOrders.findIndex(o => o.id === orderId);
  if (index === -1) throw new Error('Order not found');

  const order = availableOrders[index];

  if (order.status !== 'pending') {
    throw new Error('Order is no longer available');
  }

  order.status = 'accepted';
  activeOrder = { ...order };
  availableOrders.splice(index, 1);

  return activeOrder;
};

/**
 * Progress active order status
 * accepted → picked_up → completed
 */
export const updateActiveOrderStatus = () => {
  if (!activeOrder) throw new Error('No active order');

  if (activeOrder.status === 'accepted') {
    activeOrder.status = 'picked_up';
  } else if (activeOrder.status === 'picked_up') {
    activeOrder.status = 'completed';
    activeOrder = null; // clear active order
  } else {
    throw new Error('Invalid order state');
  }

  return activeOrder;
};