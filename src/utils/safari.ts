import { SafariPageData } from "./types";

/**
 * Get the current Safari page URL
 * @returns The URL of the current Safari page
 * @throws Error if Safari is not running or no page is loaded
 */
export async function getCurrentSafariURL(): Promise<string> {
  // TODO: Implement AppleScript/JXA to get Safari URL
  throw new Error("Not implemented");
}

/**
 * Get the current Safari page title
 * @returns The title of the current Safari page
 * @throws Error if Safari is not running or no page is loaded
 */
export async function getCurrentSafariTitle(): Promise<string> {
  // TODO: Implement AppleScript/JXA to get Safari title
  throw new Error("Not implemented");
}

/**
 * Get both URL and title from the current Safari page
 * @returns Object containing URL and title
 * @throws Error if Safari is not running or no page is loaded
 */
export async function getSafariPageData(): Promise<SafariPageData> {
  const [url, title] = await Promise.all([getCurrentSafariURL(), getCurrentSafariTitle()]);
  return { url, title };
}
