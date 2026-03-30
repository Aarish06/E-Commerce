import type { Banner } from "../types/Banner";
import { testBanner } from "../data/testBanner";

class BannerRepository {
  private banner: Banner = { ...testBanner };

  get(): Banner {
    return this.banner;
  }

  update(image: string) {
    this.banner.image = image;
  }
}

export const bannerRepository = new BannerRepository();