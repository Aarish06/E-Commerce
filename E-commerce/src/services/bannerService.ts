import { bannerRepository } from "../repositories/bannerRepository";

class BannerService {
  getBanner() {
    return bannerRepository.get();
  }

  updateBanner(image: string) {
    bannerRepository.update(image);
  }
}

export const bannerService = new BannerService();