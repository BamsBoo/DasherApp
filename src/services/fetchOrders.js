import ordersData from '../mock/mockOrders.json';

/**
 * Simulate fetching all orders from local JSON
 */
export const fetchOrders = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Return only pending orders
        const pendingOrders = ordersData.orders.filter(
          order => order.status === 'pending',
        );

        resolve(pendingOrders);
      } catch (error) {
        reject('Failed to fetch orders');
      }
    }, 1000); // simulate 1 second network delay
  });
};