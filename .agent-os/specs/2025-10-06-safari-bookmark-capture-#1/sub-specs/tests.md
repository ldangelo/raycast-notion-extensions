# Tests Specification

This is the tests coverage details for the spec detailed in @.agent-os/specs/2025-10-06-safari-bookmark-capture-#1/spec.md

> Created: 2025-10-06
> Version: 1.0.0

## Test Coverage

### Unit Tests

#### **Safari Integration (`safari.ts`)**

- **Test: getCurrentSafariURL() returns valid URL**
  - Mock AppleScript execution to return sample URL
  - Verify function returns properly formatted URL string

- **Test: getCurrentSafariURL() throws error when Safari not running**
  - Mock AppleScript execution to throw "Safari not running" error
  - Verify function throws appropriate error with clear message

- **Test: getCurrentSafariTitle() returns page title**
  - Mock AppleScript execution to return sample page title
  - Verify function returns title string

- **Test: getCurrentSafariTitle() handles empty title**
  - Mock AppleScript execution to return empty string
  - Verify function returns empty string or default value

- **Test: getSafariPageData() returns combined URL and title**
  - Mock both URL and title AppleScript calls
  - Verify function returns object with both properties

#### **Notion Client (`notion-client.ts`)**

- **Test: findBookmarksDatabase() returns database ID**
  - Mock MCP server response with database list
  - Verify function finds and returns Bookmarks database ID

- **Test: findBookmarksDatabase() throws error when database not found**
  - Mock MCP server response with empty database list
  - Verify function throws "Database not found" error

- **Test: createBookmark() creates database page with correct properties**
  - Mock MCP server createPage call
  - Verify function sends correct payload with URL, title, date, tags

- **Test: createBookmark() handles MCP server errors**
  - Mock MCP server to throw connection error
  - Verify function throws appropriate error message

- **Test: connectToMCPServer() establishes connection**
  - Mock MCP server connection
  - Verify function returns connected client

- **Test: connectToMCPServer() throws error when server unavailable**
  - Mock MCP server connection failure
  - Verify function throws clear error message

#### **Type Definitions (`types.ts`)**

- **Test: BookmarkData type enforces required fields**
  - Validate TypeScript compilation with valid data
  - Verify compilation fails with missing required fields

- **Test: NotionDatabaseProperty type matches expected schema**
  - Validate type definitions match MCP server responses

### Integration Tests

#### **Bookmark Capture Workflow**

- **Test: End-to-end bookmark capture success**
  - Mock Safari running with valid page
  - Mock MCP server with Bookmarks database
  - Trigger bookmark capture command
  - Verify bookmark created with all fields populated

- **Test: Bookmark capture handles Safari not running**
  - Mock Safari not running error
  - Trigger bookmark capture command
  - Verify error toast appears with helpful message

- **Test: Bookmark capture handles MCP server unavailable**
  - Mock Safari returning valid data
  - Mock MCP server connection failure
  - Trigger bookmark capture command
  - Verify error toast appears with MCP server message

- **Test: Bookmark capture handles missing Bookmarks database**
  - Mock Safari returning valid data
  - Mock MCP server connected but database not found
  - Trigger bookmark capture command
  - Verify error toast appears with database not found message

#### **Form Validation**

- **Test: Form pre-fills URL and title from Safari**
  - Mock Safari data
  - Render bookmark capture form
  - Verify URL and title fields contain Safari data

- **Test: Form requires title field**
  - Render form
  - Clear title field
  - Attempt to submit
  - Verify validation error appears

- **Test: Form accepts optional tags**
  - Render form
  - Submit without tags
  - Verify bookmark created without tags
  - Submit with tags
  - Verify bookmark created with tags

- **Test: Form shows loading state during save**
  - Render form
  - Submit with delayed MCP response
  - Verify loading spinner or disabled state appears

### Feature Tests

#### **Complete User Workflows**

- **Test: Happy path - capture bookmark from Safari**
  1. User has Safari open with webpage
  2. User triggers Raycast command
  3. Form appears with URL and title pre-filled
  4. User adds "productivity" tag
  5. User submits form
  6. Success toast appears
  7. Bookmark exists in Notion Bookmarks database

- **Test: Error recovery - Safari closed**
  1. User has Safari closed
  2. User triggers Raycast command
  3. Error toast appears: "Please open Safari first"
  4. User opens Safari and navigates to page
  5. User triggers command again
  6. Form appears successfully

- **Test: Error recovery - MCP server offline**
  1. User triggers command with MCP server offline
  2. Error toast appears with MCP connection error
  3. User starts MCP server
  4. User triggers command again
  5. Form appears and bookmark saves successfully

## Mocking Requirements

### External Services

- **AppleScript Execution:**
  - Mock `execSync` or equivalent Node.js process execution
  - Provide sample responses for URL and title queries
  - Mock error scenarios (Safari not running, no window, etc.)

- **MCP Server:**
  - Mock MCP client connection and methods
  - Provide sample database list responses
  - Provide sample createPage success/error responses
  - Mock connection timeout scenarios

- **Raycast API:**
  - Mock `showToast`, `Toast`, `Form`, and other Raycast components
  - Verify toast messages and form interactions
  - Mock keyboard shortcuts and command triggers

### Time-Based Tests

- **Current Timestamp:**
  - Mock `Date.now()` or `new Date()` for consistent test results
  - Verify date/time field is populated with mocked timestamp

### Environment Variables

- **MCP Server Configuration:**
  - Mock environment variables for MCP server host/port (if applicable)
  - Test fallback to default values

## Test Execution Strategy

### Test-Driven Development (TDD) Approach

1. Write failing tests for Safari integration
2. Implement Safari AppleScript functions until tests pass
3. Write failing tests for MCP client functions
4. Implement MCP client until tests pass
5. Write failing tests for bookmark capture command
6. Implement command component until tests pass
7. Write integration tests for complete workflow
8. Verify all tests pass before code review

### Continuous Integration

- All tests must pass before merging to main branch
- Run `npm test` in CI pipeline
- Maintain 80%+ code coverage target
- Block PRs with failing tests

### Manual Testing Checklist

- [ ] Install extension in Raycast locally
- [ ] Test with Safari running and valid page
- [ ] Test with Safari closed
- [ ] Test with MCP server offline
- [ ] Test with missing Bookmarks database
- [ ] Test form validation (empty title, invalid URL)
- [ ] Test with various page titles (special characters, very long titles)
- [ ] Test with various URLs (http, https, localhost, etc.)
- [ ] Verify bookmark appears in Notion Bookmarks database
- [ ] Verify all fields are correctly populated in Notion
