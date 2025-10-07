import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { BookmarkData } from "./types";

let mcpClient: Client | null = null;

/**
 * Reset the MCP client connection (for testing purposes)
 */
export function resetMCPClient(): void {
  mcpClient = null;
}

/**
 * Connect to the Notion MCP server
 * @throws Error if MCP server is not running or not accessible
 */
export async function connectToMCPServer(): Promise<void> {
  if (mcpClient) {
    return; // Already connected
  }

  try {
    // Create stdio transport for Notion MCP server
    const transport = new StdioClientTransport({
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-notion"],
    });

    // Create MCP client
    mcpClient = new Client(
      {
        name: "notion-bookmark-capture",
        version: "1.0.0",
      },
      {
        capabilities: {},
      }
    );

    // Connect to the server
    await mcpClient.connect(transport);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Cannot connect to Notion MCP server. Please ensure the Notion MCP server is configured in Raycast. Error: ${errorMessage}`
    );
  }
}

/**
 * Get the MCP client instance, connecting if necessary
 */
async function getClient(): Promise<Client> {
  if (!mcpClient) {
    await connectToMCPServer();
  }

  if (!mcpClient) {
    throw new Error("Failed to initialize MCP client");
  }

  return mcpClient;
}

/**
 * Find the Bookmarks database in Notion
 * @returns The Bookmarks database ID
 * @throws Error if database is not found
 */
export async function findBookmarksDatabase(): Promise<string> {
  try {
    const client = await getClient();

    // Search for Bookmarks database using MCP tool
    const response = await client.callTool(
      {
        name: "post-search",
        arguments: {
          query: "Bookmarks",
          filter: {
            property: "object",
            value: "database",
          },
        },
      },
      undefined as any
    );

    // Parse the response
    const content = (response.content as any)[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response format from MCP server");
    }

    const result = JSON.parse(content.text);

    // Find the Bookmarks database in the results
    const bookmarksDb = result.results?.find(
      (db: any) =>
        db.object === "database" &&
        db.title?.some((t: any) => t.plain_text?.toLowerCase().includes("bookmark"))
    );

    if (!bookmarksDb) {
      throw new Error(
        "Bookmarks database not found in your Notion workspace. Please create a database named 'Bookmarks' in Notion."
      );
    }

    return bookmarksDb.id;
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      throw error; // Re-throw database not found errors
    }

    throw new Error(
      `Failed to search for Bookmarks database: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Create a new bookmark entry in the Notion Bookmarks database
 * @param bookmark The bookmark data to save
 * @throws Error if bookmark creation fails
 */
export async function createBookmark(bookmark: BookmarkData): Promise<void> {
  try {
    const client = await getClient();

    // First, find the Bookmarks database
    const databaseId = await findBookmarksDatabase();

    // Create the page properties
    const properties: any = {
      title: {
        title: [
          {
            text: {
              content: bookmark.title || bookmark.url,
            },
          },
        ],
      },
      URL: {
        url: bookmark.url,
      },
      Created: {
        date: {
          start: bookmark.timestamp.toISOString(),
        },
      },
    };

    // Add tags if provided
    if (bookmark.tags && bookmark.tags.length > 0) {
      properties.Tags = {
        multi_select: bookmark.tags.map((tag) => ({ name: tag })),
      };
    }

    // Create the page in the database
    await client.callTool(
      {
        name: "post-page",
        arguments: {
          parent: {
            database_id: databaseId,
          },
          properties,
        },
      },
      undefined as any
    );
  } catch (error) {
    throw new Error(
      `Failed to create bookmark in Notion: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
