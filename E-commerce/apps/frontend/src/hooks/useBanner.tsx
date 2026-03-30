import { useState, useEffect, useCallback } from "react";
import { bannerService } from "../services/bannerService";
import type { Banner } from "../types/Banner";

/**
 * Custom hook for managing banner state.
 * 
 * Provides the current banner data, a method to update it, and a loading state.
 * Automatically syncs with bannerService on mount.
 */
export const useBanner = () => {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Loads the banner data from the API.
   */
  const loadBanner = useCallback(async () => {
    setLoading(true);
    try {
      const data = await bannerService.getBanner();
      setBanner(data);
    } catch (error) {
      console.error("Failed to load banner:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Updates the banner image and refreshes local state.
   *
   * @param image - New banner image URL or path
   */
  const updateBanner = useCallback(async (image: string) => {
    setLoading(true);
    try {
      if (banner?.id) {
        const updated = await bannerService.updateBanner(banner.id, image);
        setBanner(updated);
      } else {
        const created = await bannerService.createBanner(image);
        setBanner(created);
      }
    } catch (error) {
      console.error("Failed to update banner:", error);
    } finally {
      setLoading(false);
    }
  }, [banner]);

  /**
   * Ensures banner state is synced when the component mounts.
   */
  useEffect(() => {
    loadBanner();
  }, [loadBanner]);

  return {
    banner,
    loading,
    updateBanner
  };
};