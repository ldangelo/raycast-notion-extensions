import {
  connectToMCPServer,
  findBookmarksDatabase,
  createBookmark,
  resetMCPClient,
} from "../utils/notion-client";
import { BookmarkData } from "../utils/types";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

jest.mock("@modelcontextprotocol/sdk/client/index.js");

const mockedClient = Client as jest.MockedClass<typeof Client>;

describe("Notion MCP Client", () => {
  let mockClientInstance: jest.Mocked<Client>;

  beforeEach(() => {
    jest.clearAllMocks();
    resetMCPClient();

    // Create a mock client instance
    mockClientInstance = {
      connect: jest.fn(),
      callTool: jest.fn(),
      close: jest.fn(),
    } as any;

    mockedClient.mockImplementation(() => mockClientInstance);
  });

  describe("connectToMCPServer", () => {
    it("should connect to MCP server successfully", async () => {
      mockClientInstance.connect.mockResolvedValue(undefined);

      await connectToMCPServer();

      expect(mockClientInstance.connect).toHaveBeenCalled();
    });

    it("should throw error when MCP server is not available", async () => {
      mockClientInstance.connect.mockRejectedValue(new Error("ENOENT"));

      await expect(connectToMCPServer()).rejects.toThrow(
        "Cannot connect to Notion MCP server"
      );
    });

    it("should throw error on connection timeout", async () => {
      mockClientInstance.connect.mockRejectedValue(new Error("timeout"));

      await expect(connectToMCPServer()).rejects.toThrow(
        "Cannot connect to Notion MCP server"
      );
    });
  });

  describe("findBookmarksDatabase", () => {
    beforeEach(() => {
      mockClientInstance.connect.mockResolvedValue(undefined);
    });

    it("should find and return Bookmarks database ID", async () => {
      const mockDatabaseId = "database-123";
      mockClientInstance.callTool.mockResolvedValue({
        content: [
          {
            type: "text",
            text: JSON.stringify({
              results: [
                {
                  id: mockDatabaseId,
                  object: "database",
                  title: [{ plain_text: "Bookmarks" }],
                },
              ],
            }),
          },
        ],
      } as any);

      const databaseId = await findBookmarksDatabase();

      expect(databaseId).toBe(mockDatabaseId);
      expect(mockClientInstance.callTool).toHaveBeenCalledWith(
        {
          name: "post-search",
          arguments: {
            query: "Bookmarks",
            filter: { property: "object", value: "database" },
          },
        },
        undefined
      );
    });

    it("should throw error when Bookmarks database not found", async () => {
      mockClientInstance.callTool.mockResolvedValue({
        content: [
          {
            type: "text",
            text: JSON.stringify({ results: [] }),
          },
        ],
      } as any);

      await expect(findBookmarksDatabase()).rejects.toThrow(
        "Bookmarks database not found in your Notion workspace"
      );
    });

    it("should throw error when MCP tool call fails", async () => {
      mockClientInstance.callTool.mockRejectedValue(new Error("Tool call failed"));

      await expect(findBookmarksDatabase()).rejects.toThrow(
        "Failed to search for Bookmarks database"
      );
    });
  });

  describe("createBookmark", () => {
    const mockDatabaseId = "database-123";
    const mockBookmark: BookmarkData = {
      url: "https://example.com",
      title: "Example Site",
      timestamp: new Date("2025-10-06T10:00:00Z"),
      tags: ["productivity", "tools"],
    };

    beforeEach(() => {
      mockClientInstance.connect.mockResolvedValue(undefined);
    });

    it("should create bookmark successfully", async () => {
      // Mock findBookmarksDatabase response
      mockClientInstance.callTool.mockResolvedValueOnce({
        content: [
          {
            type: "text",
            text: JSON.stringify({
              results: [
                {
                  id: mockDatabaseId,
                  object: "database",
                  title: [{ plain_text: "Bookmarks" }],
                },
              ],
            }),
          },
        ],
      } as any);

      // Mock createPage response
      mockClientInstance.callTool.mockResolvedValueOnce({
        content: [
          {
            type: "text",
            text: JSON.stringify({
              id: "page-456",
              object: "page",
            }),
          },
        ],
      } as any);

      await createBookmark(mockBookmark);

      expect(mockClientInstance.callTool).toHaveBeenCalledWith(
        {
          name: "post-page",
          arguments: expect.objectContaining({
            parent: { database_id: mockDatabaseId },
            properties: expect.objectContaining({
              title: expect.any(Object),
            }),
          }),
        },
        undefined
      );
    });

    it("should throw error when page creation fails", async () => {
      // findBookmarksDatabase succeeds
      mockClientInstance.callTool.mockResolvedValueOnce({
        content: [
          {
            type: "text",
            text: JSON.stringify({
              results: [
                {
                  id: mockDatabaseId,
                  object: "database",
                  title: [{ plain_text: "Bookmarks" }],
                },
              ],
            }),
          },
        ],
      } as any);

      // createPage fails
      mockClientInstance.callTool.mockRejectedValueOnce(
        new Error("Permission denied")
      );

      await expect(createBookmark(mockBookmark)).rejects.toThrow(
        "Failed to create bookmark in Notion"
      );
    });

    it("should handle bookmarks with special characters", async () => {
      const specialBookmark: BookmarkData = {
        url: "https://example.com/path?query=test&foo=bar",
        title: "Test – Special Characters & More",
        timestamp: new Date("2025-10-06T10:00:00Z"),
        tags: ["test & dev"],
      };

      // Mock findBookmarksDatabase response
      mockClientInstance.callTool.mockResolvedValueOnce({
        content: [
          {
            type: "text",
            text: JSON.stringify({
              results: [
                {
                  id: mockDatabaseId,
                  object: "database",
                  title: [{ plain_text: "Bookmarks" }],
                },
              ],
            }),
          },
        ],
      } as any);

      // Mock createPage response
      mockClientInstance.callTool.mockResolvedValueOnce({
        content: [
          {
            type: "text",
            text: JSON.stringify({ id: "page-789", object: "page" }),
          },
        ],
      } as any);

      await expect(createBookmark(specialBookmark)).resolves.not.toThrow();
    });
  });
});
