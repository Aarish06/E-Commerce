const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

interface ProfileUpdateData {
  name?: string;
  phone?: string;
  address?: string;
}

class ApiService {
  private async fetchWithAuth(endpoint: string, token: string | null, options: RequestInit = {}) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getProfile(token: string | null) {
    const response = await this.fetchWithAuth('/users/me/profile', token);
    return response.data;
  }

  async updateProfile(token: string | null, data: ProfileUpdateData) {
    const response = await this.fetchWithAuth('/users/me/profile', token, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.data;
  }

  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  }

  async getBanners() {
    const response = await fetch(`${API_BASE_URL}/banners`);
    if (!response.ok) {
      throw new Error('Failed to fetch banners');
    }
    return response.json();
  }
}

export const apiService = new ApiService();
