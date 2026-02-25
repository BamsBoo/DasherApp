import { acceptOrderAction } from '../store/ordersStore';

export const acceptOrder = (orderId) => {
  return new Promise((resolve, reject) => {
    try {
      const order = acceptOrderAction(orderId);
      setTimeout(() => resolve(order), 500);
    } catch (e) {
      reject(e);
    }
  });
};