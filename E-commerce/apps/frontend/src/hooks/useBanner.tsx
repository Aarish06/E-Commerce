import { useState, useEffect } from "react";
import { bannerService } from "../services/bannerService";

/**
 * Custom hook for managing banner state.
 * 
 * Provides the current banner data and a method to update it.
 * Automatically syncs with bannerService on mount.
 */
export const useBanner = () => {
  const [banner, setBanner] = useState(bannerService.getBanner());

  /**
   * Refreshes banner state from bannerService.
   */
  const refresh = () => {
    setBanner({ ...bannerService.getBanner() });
  };

  /**
   * Updates the banner image and refreshes local state.
   *
   * @param image - New banner image URL or path
   */
  const updateBanner = (image: string) => {
    bannerService.updateBanner(image);
    refresh();
  };

  /**
   * Ensures banner state is synced when the component mounts.
   */
  useEffect(() => {
    refresh();
  }, []);

  return {
    banner,
    updateBanner
  };
};