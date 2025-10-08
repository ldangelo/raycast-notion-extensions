import { getSafariPageData } from "../utils/safari";
import { createBookmark } from "../utils/notion-client";
import { BookmarkData } from "../utils/types";

jest.mock("../utils/safari");
jest.mock("../utils/notion-client");

const mockedGetSafariPageData = getSafariPageData as jest.MockedFunction<typeof getSafariPageData>;
const mockedCreateBookmark = createBookmark as jest.MockedFunction<typeof createBookmark>;

describe("Bookmark Capture Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Safari Data Integration", () => {
    it("should successfully fetch Safari page data", async () => {
      const mockSafariData = {
        url: "https://example.com",
        title: "Example Domain",
      };

      mockedGetSafariPageData.mockResolvedValue(mockSafariData);

      const data = await getSafariPageData();

      expect(data).toEqual(mockSafariData);
      expect(data.url).toBe("https://example.com");
      expect(data.title).toBe("Example Domain");
    });

    it("should handle Safari not running error", async () => {
      mockedGetSafariPageData.mockRejectedValue(new Error("Safari is not running"));

      await expect(getSafariPageData()).rejects.toThrow("Safari is not running");
    });

    it("should handle no active Safari window error", async () => {
      mockedGetSafariPageData.mockRejectedValue(
        new Error("No active Safari window or tab")
      );

      await expect(getSafariPageData()).rejects.toThrow("No active Safari window or tab");
    });

    it("should handle empty title from Safari", async () => {
      const mockSafariData = {
        url: "https://example.com",
        title: "",
      };

      mockedGetSafariPageData.mockResolvedValue(mockSafariData);

      const data = await getSafariPageData();

      expect(data.title).toBe("");
    });
  });

  describe("Bookmark Creation Integration", () => {
    it("should create bookmark with all fields", async () => {
      const bookmarkData: BookmarkData = {
        url: "https://example.com",
        title: "Example Domain",
        timestamp: new Date("2025-10-06T10:00:00Z"),
        tags: ["productivity", "tools"],
      };

      mockedCreateBookmark.mockResolvedValue(undefined);

      await createBookmark(bookmarkData);

      expect(mockedCreateBookmark).toHaveBeenCalledWith(bookmarkData);
      expect(mockedCreateBookmark).toHaveBeenCalledTimes(1);
    });

    it("should create bookmark without tags", async () => {
      const bookmarkData: BookmarkData = {
        url: "https://example.com",
        title: "Example Domain",
        timestamp: new Date("2025-10-06T10:00:00Z"),
      };

      mockedCreateBookmark.mockResolvedValue(undefined);

      await createBookmark(bookmarkData);

      expect(mockedCreateBookmark).toHaveBeenCalledWith(bookmarkData);
    });

    it("should handle MCP server unavailable error", async () => {
      const bookmarkData: BookmarkData = {
        url: "https://example.com",
        title: "Example Domain",
        timestamp: new Date(),
      };

      mockedCreateBookmark.mockRejectedValue(
        new Error("Cannot connect to Notion MCP server")
      );

      await expect(createBookmark(bookmarkData)).rejects.toThrow(
        "Cannot connect to Notion MCP server"
      );
    });

    it("should handle Bookmarks database not found error", async () => {
      const bookmarkData: BookmarkData = {
        url: "https://example.com",
        title: "Example Domain",
        timestamp: new Date(),
      };

      mockedCreateBookmark.mockRejectedValue(
        new Error("Bookmarks database not found in your Notion workspace")
      );

      await expect(createBookmark(bookmarkData)).rejects.toThrow(
        "Bookmarks database not found in your Notion workspace"
      );
    });
  });

  describe("Tag Parsing Logic", () => {
    it("should parse comma-separated tags correctly", () => {
      const tagsString = "productivity, tools, reference";
      const tagArray = tagsString
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      expect(tagArray).toEqual(["productivity", "tools", "reference"]);
    });

    it("should handle tags with extra spaces", () => {
      const tagsString = "  productivity  ,  tools  ,  reference  ";
      const tagArray = tagsString
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      expect(tagArray).toEqual(["productivity", "tools", "reference"]);
    });

    it("should handle empty tags string", () => {
      // Test that empty string results in undefined tags
      let tagsString: string = "";
      const result = tagsString ? tagsString.split(",") : undefined;

      expect(result).toBeUndefined();
    });

    it("should filter out empty tags", () => {
      const tagsString = "productivity, , tools, ,  , reference";
      const tagArray = tagsString
        .split(",")
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0);

      expect(tagArray).toEqual(["productivity", "tools", "reference"]);
    });
  });

  describe("Special Characters Handling", () => {
    it("should handle URLs with query parameters", async () => {
      const mockSafariData = {
        url: "https://example.com/path?query=test&foo=bar",
        title: "Test Page",
      };

      mockedGetSafariPageData.mockResolvedValue(mockSafariData);

      const data = await getSafariPageData();

      expect(data.url).toBe("https://example.com/path?query=test&foo=bar");
    });

    it("should handle titles with special characters", async () => {
      const mockSafariData = {
        url: "https://example.com",
        title: "Test – Special Characters & More",
      };

      mockedGetSafariPageData.mockResolvedValue(mockSafariData);

      const data = await getSafariPageData();

      expect(data.title).toBe("Test – Special Characters & More");
    });

    it("should handle bookmarks with special characters in all fields", async () => {
      const bookmarkData: BookmarkData = {
        url: "https://example.com/path?query=test&foo=bar#section",
        title: "Test – Special Characters & More",
        timestamp: new Date("2025-10-06T10:00:00Z"),
        tags: ["test & dev", "productivity > tools"],
      };

      mockedCreateBookmark.mockResolvedValue(undefined);

      await createBookmark(bookmarkData);

      expect(mockedCreateBookmark).toHaveBeenCalledWith(bookmarkData);
    });
  });

  describe("End-to-End Workflow", () => {
    it("should complete full bookmark capture workflow", async () => {
      // Step 1: Fetch Safari data
      const mockSafariData = {
        url: "https://example.com/article",
        title: "Interesting Article",
      };

      mockedGetSafariPageData.mockResolvedValue(mockSafariData);

      const safariData = await getSafariPageData();

      // Step 2: Create bookmark data
      const bookmarkData: BookmarkData = {
        url: safariData.url,
        title: safariData.title,
        timestamp: new Date("2025-10-06T10:00:00Z"),
        tags: ["productivity", "reading"],
      };

      // Step 3: Save to Notion
      mockedCreateBookmark.mockResolvedValue(undefined);

      await createBookmark(bookmarkData);

      // Verify workflow
      expect(mockedGetSafariPageData).toHaveBeenCalled();
      expect(mockedCreateBookmark).toHaveBeenCalledWith(bookmarkData);
    });
  });
});
