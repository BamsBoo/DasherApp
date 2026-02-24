// src/store/ordersStore.js
import ordersData from '../mocks/mockOrders.json';


const initialOrders = ordersData.orders || ordersData || [];

let availableOrders = [...initialOrders];
let activeOrder = null;

export const getAvailableOrders = () => availableOrders;
export const getActiveOrder = () => activeOrder;

export const acceptOrderAction = (orderId) => {
  const index = availableOrders.findIndex(o => o.id === orderId);
  if (index === -1) {
    throw new Error('Order not found');
  }

  const order = availableOrders[index];

  if (order.status !== 'pending') {
    throw new Error('Order is no longer available');
  }

  order.status = 'accepted';
  activeOrder = { ...order };
  availableOrders.splice(index, 1);

  return activeOrder;
};