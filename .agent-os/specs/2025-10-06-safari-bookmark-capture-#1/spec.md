# Spec Requirements Document

> Spec: Safari Bookmark Capture to Notion
> Created: 2025-10-06
> GitHub Issue: #1
> Status: Planning

## Overview

Implement a Raycast command that captures the current Safari page URL and metadata, presenting a form to the user with pre-filled fields, and saves the bookmark entry to the Notion Bookmarks database via the MCP server. This feature reduces bookmark capture time from 30-60 seconds to under 5 seconds by eliminating context switching.

## User Stories

### Quick Bookmark Capture

As a knowledge worker browsing in Safari, I want to save the current page to my Notion Bookmarks database with a single Raycast command, so that I can capture valuable resources without interrupting my workflow.

**Workflow:**
1. User is browsing a webpage in Safari
2. User triggers Raycast with keyboard shortcut
3. User types the bookmark capture command
4. Raycast displays a form with pre-filled URL and page title from Safari
5. User optionally adds tags or notes
6. User confirms, and bookmark is saved to Notion Bookmarks database
7. User receives confirmation or error message

**Problem Solved:** Eliminates the need to manually copy URLs, switch to Notion, find the database, and fill in fields, reducing capture time by 80%.

## Spec Scope

1. **Safari Integration** - Capture current Safari page URL and title using AppleScript/JXA
2. **MCP Server Connection** - Establish connection to installed Notion MCP server for database access
3. **Bookmarks Database Detection** - Auto-discover and connect to the Bookmarks database in Notion
4. **Form-Based Capture UI** - Display Raycast form with pre-filled URL, title, date/time, and editable tags field
5. **Error Handling** - Generate clear error messages for Safari not running, MCP server unavailable, or missing database

## Out of Scope

- Auto-tagging or AI-powered tag suggestions
- Bulk bookmark import
- Browser support beyond Safari (Chrome, Firefox, etc.)
- Bookmark editing or deletion
- Custom field mapping or schema customization
- Multi-database bookmark saving

## Expected Deliverable

1. User can trigger a Raycast command that captures the current Safari page and displays a pre-filled form
2. Form submission successfully creates a new entry in the Notion Bookmarks database with URL, title, timestamp, and tags
3. Appropriate error messages appear when Safari is not running, MCP server is unavailable, or Bookmarks database cannot be found

## Spec Documentation

- Tasks: @.agent-os/specs/2025-10-06-safari-bookmark-capture-#1/tasks.md
- Technical Specification: @.agent-os/specs/2025-10-06-safari-bookmark-capture-#1/sub-specs/technical-spec.md
- Tests Specification: @.agent-os/specs/2025-10-06-safari-bookmark-capture-#1/sub-specs/tests.md
