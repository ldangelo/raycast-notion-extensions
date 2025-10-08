# Spec Tasks

These are the tasks to be completed for the spec detailed in @.agent-os/specs/2025-10-06-safari-bookmark-capture-#1/spec.md

> Created: 2025-10-06
> Status: Ready for Implementation

## Tasks

- [x] 1. Project Setup & Scaffolding
  - [x] 1.1 Initialize Raycast extension with `npm init @raycast`
  - [x] 1.2 Configure TypeScript (tsconfig.json) for strict type checking
  - [x] 1.3 Install dependencies: @raycast/api, @raycast/utils, jest, @types/jest, @types/node
  - [x] 1.4 Create project structure: src/, src/utils/, src/__tests__/
  - [x] 1.5 Configure Jest for unit testing
  - [x] 1.6 Create placeholder files: bookmark-capture.tsx, safari.ts, notion-client.ts, types.ts
  - [x] 1.7 Verify build succeeds with `npm run build`

- [x] 2. Safari Integration
  - [x] 2.1 Write tests for Safari URL and title capture (safari.test.ts)
  - [x] 2.2 Implement getCurrentSafariURL() using AppleScript/JXA
  - [x] 2.3 Implement getCurrentSafariTitle() using AppleScript/JXA
  - [x] 2.4 Implement getSafariPageData() to return combined URL and title
  - [x] 2.5 Add error handling for Safari not running
  - [x] 2.6 Add error handling for no active Safari window
  - [x] 2.7 Verify all Safari integration tests pass

- [x] 3. Notion MCP Client Integration
  - [x] 3.1 Write tests for MCP client functions (notion-client.test.ts)
  - [x] 3.2 Research and select MCP client library (or implement minimal client)
  - [x] 3.3 Implement connectToMCPServer() function
  - [x] 3.4 Implement findBookmarksDatabase() to search for database by name
  - [x] 3.5 Implement createBookmark() to create database page with properties
  - [x] 3.6 Add error handling for MCP server unavailable
  - [x] 3.7 Add error handling for database not found
  - [x] 3.8 Verify all MCP client tests pass

- [x] 4. Bookmark Capture Command UI
  - [x] 4.1 Write integration tests for bookmark capture workflow
  - [x] 4.2 Create bookmark-capture.tsx with basic Raycast Form component
  - [x] 4.3 Add form fields: URL (text), Title (text), Date/Time (date), Tags (text)
  - [x] 4.4 Pre-fill URL and Title fields with Safari data on component mount
  - [x] 4.5 Pre-fill Date/Time field with current timestamp
  - [x] 4.6 Implement form validation (required title, valid URL format)
  - [x] 4.7 Add form submission handler that calls createBookmark()
  - [x] 4.8 Add loading state during MCP operation
  - [x] 4.9 Add success toast notification on successful save
  - [x] 4.10 Add error toast notifications for all error cases
  - [x] 4.11 Verify all integration tests pass

- [ ] 5. End-to-End Testing & Polish
  - [ ] 5.1 Install extension in Raycast locally with `npm run dev` (Manual - User)
  - [ ] 5.2 Test happy path: Safari running, MCP connected, database exists (Manual - User)
  - [ ] 5.3 Test error case: Safari not running (Manual - User)
  - [ ] 5.4 Test error case: MCP server offline (Manual - User)
  - [ ] 5.5 Test error case: Bookmarks database not found (Manual - User)
  - [ ] 5.6 Test edge cases: special characters in title, very long URLs, multiple tags (Manual - User)
  - [ ] 5.7 Verify bookmark appears in Notion Bookmarks database with correct fields (Manual - User)
  - [x] 5.8 Run full test suite with `npm test` and ensure all tests pass
  - [x] 5.9 Update package.json with command metadata (title, icon, description)
  - [x] 5.10 Create README.md with setup instructions
