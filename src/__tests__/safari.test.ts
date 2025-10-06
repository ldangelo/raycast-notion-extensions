import { getCurrentSafariURL, getCurrentSafariTitle, getSafariPageData } from "../utils/safari";
import { execSync } from "child_process";

jest.mock("child_process");

const mockedExecSync = execSync as jest.MockedFunction<typeof execSync>;

describe("Safari Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getCurrentSafariURL", () => {
    it("should return the current Safari URL", async () => {
      const mockUrl = "https://example.com";
      mockedExecSync.mockReturnValue(mockUrl as any);

      const url = await getCurrentSafariURL();

      expect(url).toBe(mockUrl);
      expect(mockedExecSync).toHaveBeenCalledWith(
        'osascript -e \'tell application "Safari" to return URL of current tab of front window\'',
        { encoding: "utf8" }
      );
    });

    it("should throw error when Safari is not running", async () => {
      mockedExecSync.mockImplementation(() => {
        throw new Error("Application Safari is not running");
      });

      await expect(getCurrentSafariURL()).rejects.toThrow("Safari is not running");
    });

    it("should throw error when no active Safari window", async () => {
      mockedExecSync.mockImplementation(() => {
        throw new Error("Can't get current tab");
      });

      await expect(getCurrentSafariURL()).rejects.toThrow("No active Safari window or tab");
    });

    it("should handle empty URL", async () => {
      mockedExecSync.mockReturnValue("" as any);

      await expect(getCurrentSafariURL()).rejects.toThrow("No page loaded in current tab");
    });
  });

  describe("getCurrentSafariTitle", () => {
    it("should return the current Safari page title", async () => {
      const mockTitle = "Example Domain";
      mockedExecSync.mockReturnValue(mockTitle as any);

      const title = await getCurrentSafariTitle();

      expect(title).toBe(mockTitle);
      expect(mockedExecSync).toHaveBeenCalledWith(
        'osascript -e \'tell application "Safari" to return name of current tab of front window\'',
        { encoding: "utf8" }
      );
    });

    it("should throw error when Safari is not running", async () => {
      mockedExecSync.mockImplementation(() => {
        throw new Error("Application Safari is not running");
      });

      await expect(getCurrentSafariTitle()).rejects.toThrow("Safari is not running");
    });

    it("should throw error when no active Safari window", async () => {
      mockedExecSync.mockImplementation(() => {
        throw new Error("Can't get current tab");
      });

      await expect(getCurrentSafariTitle()).rejects.toThrow("No active Safari window or tab");
    });

    it("should return empty string for untitled page", async () => {
      mockedExecSync.mockReturnValue("" as any);

      const title = await getCurrentSafariTitle();

      expect(title).toBe("");
    });
  });

  describe("getSafariPageData", () => {
    it("should return both URL and title", async () => {
      const mockUrl = "https://example.com";
      const mockTitle = "Example Domain";

      mockedExecSync
        .mockReturnValueOnce(mockUrl as any)
        .mockReturnValueOnce(mockTitle as any);

      const data = await getSafariPageData();

      expect(data).toEqual({
        url: mockUrl,
        title: mockTitle,
      });
    });

    it("should throw error when Safari is not running", async () => {
      mockedExecSync.mockImplementation(() => {
        throw new Error("Application Safari is not running");
      });

      await expect(getSafariPageData()).rejects.toThrow("Safari is not running");
    });

    it("should handle special characters in URL and title", async () => {
      const mockUrl = "https://example.com/path?query=test&foo=bar";
      const mockTitle = "Test Page – Special Characters";

      mockedExecSync
        .mockReturnValueOnce(mockUrl as any)
        .mockReturnValueOnce(mockTitle as any);

      const data = await getSafariPageData();

      expect(data.url).toBe(mockUrl);
      expect(data.title).toBe(mockTitle);
    });
  });
});
