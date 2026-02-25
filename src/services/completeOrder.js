import orders from '../mocks/mockOrders.json';

export const completeOrder = orderId => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orderIndex = orders.findIndex(o => o.id === orderId);

      if (orderIndex === -1) {
        reject('Order not found');
        return;
      }

      if (orders[orderIndex].status !== 'accepted') {
        reject('Order cannot be completed');
        return;
      }

      // Update status
      orders[orderIndex].status = 'completed';

      resolve(orders[orderIndex]);
    }, 1000);
  });
};