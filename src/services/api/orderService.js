// Mock order storage
let orders = [];

export const orderService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...orders];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const order = orders.find(o => o.Id === id);
    return order ? { ...order } : null;
  },

  create: async (orderData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const maxId = orders.length > 0 ? Math.max(...orders.map(o => o.Id)) : 0;
    const newOrder = {
      ...orderData,
      Id: maxId + 1,
      createdAt: new Date().toISOString(),
      status: orderData.status || "pending"
    };
    orders.push(newOrder);
    return { ...newOrder };
  },

  update: async (id, orderData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = orders.findIndex(o => o.Id === id);
    if (index !== -1) {
      orders[index] = { ...orders[index], ...orderData };
      return { ...orders[index] };
    }
    return null;
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = orders.findIndex(o => o.Id === id);
    if (index !== -1) {
      const deleted = orders.splice(index, 1)[0];
      return { ...deleted };
    }
    return null;
  }
};