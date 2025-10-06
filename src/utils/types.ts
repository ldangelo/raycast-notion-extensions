/**
 * TypeScript type definitions for Notion Bookmark Capture
 */

export interface BookmarkData {
  url: string;
  title: string;
  timestamp: Date;
  tags?: string[];
}

export interface SafariPageData {
  url: string;
  title: string;
}

export interface NotionDatabase {
  id: string;
  title: string;
}

export interface NotionDatabaseProperty {
  id: string;
  name: string;
  type: string;
}
