// Simple API client for demo
export const apiClient = {
  async get(url: string) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: [] };
  },
  
  async post(url: string, data: any) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: data };
  },
  
  async put(url: string, data: any) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: data };
  },
  
  async delete(url: string) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: { success: true } };
  }
};
