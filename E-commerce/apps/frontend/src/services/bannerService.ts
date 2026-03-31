import { bannerRepository } from "../repositories/bannerRepository";
import type { Banner } from "../types/Banner";

class BannerService {
  async getBanner(): Promise<Banner | null> {
    const banners = await bannerRepository.getAll();
    return banners[0] || null;
  }

  async updateBanner(id: number, image: string): Promise<Banner> {
    return bannerRepository.update(id, { image });
  }

  async createBanner(image: string, title: string = ""): Promise<Banner> {
    return bannerRepository.create({ image, title });
  }
}

export const bannerService = new BannerService();