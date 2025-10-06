import { BookmarkData } from "./types";

/**
 * Connect to the Notion MCP server
 * @throws Error if MCP server is not running or not accessible
 */
export async function connectToMCPServer(): Promise<void> {
  // TODO: Implement MCP server connection
  throw new Error("Not implemented");
}

/**
 * Find the Bookmarks database in Notion
 * @returns The Bookmarks database ID
 * @throws Error if database is not found
 */
export async function findBookmarksDatabase(): Promise<string> {
  // TODO: Implement database search via MCP
  throw new Error("Not implemented");
}

/**
 * Create a new bookmark entry in the Notion Bookmarks database
 * @param _bookmark The bookmark data to save
 * @throws Error if bookmark creation fails
 */
export async function createBookmark(_bookmark: BookmarkData): Promise<void> {
  // TODO: Implement bookmark creation via MCP
  throw new Error("Not implemented");
}
