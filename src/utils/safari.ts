import { execSync } from "child_process";
import { SafariPageData } from "./types";

/**
 * Execute AppleScript command to get Safari data
 * @param script The AppleScript command to execute
 * @returns The output from the AppleScript execution
 * @throws Error if Safari is not running or no active window
 */
function executeAppleScript(script: string): string {
  try {
    const result = execSync(`osascript -e '${script}'`, { encoding: "utf8" });
    return result.trim();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    // Check for specific error conditions
    if (errorMessage.includes("Application Safari is not running")) {
      throw new Error("Safari is not running. Please open Safari and navigate to a page.");
    }

    if (errorMessage.includes("Can't get current tab") || errorMessage.includes("doesn't understand")) {
      throw new Error("No active Safari window or tab. Please open a page in Safari.");
    }

    // Re-throw other errors
    throw new Error(`Failed to execute AppleScript: ${errorMessage}`);
  }
}

/**
 * Get the current Safari page URL
 * @returns The URL of the current Safari page
 * @throws Error if Safari is not running or no page is loaded
 */
export async function getCurrentSafariURL(): Promise<string> {
  const script = 'tell application "Safari" to return URL of current tab of front window';
  const url = executeAppleScript(script);

  if (!url || url.trim() === "") {
    throw new Error("No page loaded in current tab");
  }

  return url;
}

/**
 * Get the current Safari page title
 * @returns The title of the current Safari page
 * @throws Error if Safari is not running or no page is loaded
 */
export async function getCurrentSafariTitle(): Promise<string> {
  const script = 'tell application "Safari" to return name of current tab of front window';
  const title = executeAppleScript(script);

  // Empty title is allowed (untitled pages)
  return title;
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
