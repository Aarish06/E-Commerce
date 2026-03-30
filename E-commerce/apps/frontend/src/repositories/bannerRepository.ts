import type { Banner } from "../types/Banner";

const API_BASE_URL = "http://localhost:3000/api";

class BannerRepository {
  async getAll(): Promise<Banner[]> {
    const response = await fetch(`${API_BASE_URL}/banners`);
    if (!response.ok) {
      throw new Error("Failed to fetch banners");
    }
    const data = await response.json();
    return data.data || [];
  }

  async create(banner: Omit<Banner, "id">): Promise<Banner> {
    const response = await fetch(`${API_BASE_URL}/banners`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(banner),
    });
    if (!response.ok) {
      throw new Error("Failed to create banner");
    }
    const data = await response.json();
    return data.data;
  }
}

export const bannerRepository = new BannerRepository();