import { getCurrentSafariURL, getCurrentSafariTitle, getSafariPageData } from "../utils/safari";

describe("Safari Integration", () => {
  describe("getCurrentSafariURL", () => {
    it("should throw not implemented error", async () => {
      await expect(getCurrentSafariURL()).rejects.toThrow("Not implemented");
    });
  });

  describe("getCurrentSafariTitle", () => {
    it("should throw not implemented error", async () => {
      await expect(getCurrentSafariTitle()).rejects.toThrow("Not implemented");
    });
  });

  describe("getSafariPageData", () => {
    it("should throw not implemented error", async () => {
      await expect(getSafariPageData()).rejects.toThrow("Not implemented");
    });
  });
});
