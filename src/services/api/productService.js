import mockProducts from "@/services/mockData/products.json";

export const productService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...mockProducts];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const product = mockProducts.find(p => p.Id === id);
    return product ? { ...product } : null;
  },

  getByCategory: async (category) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockProducts.filter(p => p.category === category).map(p => ({ ...p }));
  },

  search: async (query) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const searchTerm = query.toLowerCase();
    return mockProducts
      .filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
      )
      .map(p => ({ ...p }));
  },

  create: async (productData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const maxId = Math.max(...mockProducts.map(p => p.Id));
    const newProduct = {
      ...productData,
      Id: maxId + 1
    };
    mockProducts.push(newProduct);
    return { ...newProduct };
  },

  update: async (id, productData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockProducts.findIndex(p => p.Id === id);
    if (index !== -1) {
      mockProducts[index] = { ...mockProducts[index], ...productData };
      return { ...mockProducts[index] };
    }
    return null;
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockProducts.findIndex(p => p.Id === id);
    if (index !== -1) {
      const deleted = mockProducts.splice(index, 1)[0];
      return { ...deleted };
    }
    return null;
  }
};