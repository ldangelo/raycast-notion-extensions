import { connectToMCPServer, findBookmarksDatabase, createBookmark } from "../utils/notion-client";
import { BookmarkData } from "../utils/types";

describe("Notion MCP Client", () => {
  describe("connectToMCPServer", () => {
    it("should throw not implemented error", async () => {
      await expect(connectToMCPServer()).rejects.toThrow("Not implemented");
    });
  });

  describe("findBookmarksDatabase", () => {
    it("should throw not implemented error", async () => {
      await expect(findBookmarksDatabase()).rejects.toThrow("Not implemented");
    });
  });

  describe("createBookmark", () => {
    it("should throw not implemented error", async () => {
      const bookmark: BookmarkData = {
        url: "https://example.com",
        title: "Example",
        timestamp: new Date(),
        tags: ["test"],
      };
      await expect(createBookmark(bookmark)).rejects.toThrow("Not implemented");
    });
  });
});
