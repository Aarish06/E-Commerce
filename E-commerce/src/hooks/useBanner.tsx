import { useState, useEffect } from "react";
import { bannerService } from "../services/bannerService";

export const useBanner = () => {
  const [banner, setBanner] = useState(bannerService.getBanner());

  const refresh = () => {
    setBanner({ ...bannerService.getBanner() });
  };

  const updateBanner = (image: string) => {
    bannerService.updateBanner(image);
    refresh();
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    banner,
    updateBanner
  };
};