import mockOrders from '../mocks/mockOrders.json';

let availableOrders = [...mockOrders.orders];   // ← add .orders
let activeOrder = null;
import { acceptOrderAction } from '../store/ordersStore';

export const acceptOrder = async (orderId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    const updatedOrder = acceptOrderAction(orderId);
    return updatedOrder;
  } catch (err) {
    throw err.message || 'Failed to accept order';
  }
};