# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-10-06-safari-bookmark-capture-#1/spec.md

> Created: 2025-10-06
> Version: 1.0.0

## Technical Requirements

### Raycast Extension Setup

- **Extension Type:** Raycast Command Extension
- **Language:** TypeScript 5.x
- **UI Framework:** React with @raycast/api components
- **Build System:** npm with TypeScript compiler
- **Entry Point:** Single command file (`src/bookmark-capture.tsx`)

### Safari Integration

- **Technology:** AppleScript/JXA (JavaScript for Automation)
- **Required Data:**
  - Current Safari page URL
  - Current Safari page title
- **Error Cases:**
  - Safari not running
  - No active Safari window
  - No page loaded in current tab

### Notion MCP Server Integration

- **Connection Method:** MCP (Model Context Protocol) server client
- **Required Operations:**
  - Search for Bookmarks database by name
  - Retrieve database schema/properties
  - Create new database page with properties
- **Error Cases:**
  - MCP server not running/accessible
  - Authentication failure
  - Bookmarks database not found
  - Database creation permission denied

### Form UI Requirements

- **Components:**
  - Text input field (URL) - pre-filled, read-only or editable
  - Text input field (Title) - pre-filled, editable
  - Date/time field - pre-filled with current timestamp, editable
  - Text input field (Tags) - empty, user provides input
  - Optional: Multi-line text area (Notes)
- **Validation:**
  - URL field must be valid URL format
  - Title field required (min 1 character)
  - Tags field optional
- **User Experience:**
  - Form appears instantly when command triggered
  - Fields are pre-filled where possible
  - Clear submit and cancel actions
  - Loading state during save operation
  - Success/error toast notifications

## Approach Options

### Option A: Direct MCP Client Integration

**Description:** Build a custom MCP client within the extension to communicate directly with the Notion MCP server.

**Pros:**
- Full control over connection and error handling
- Can optimize for Raycast extension constraints
- No external dependencies beyond MCP protocol

**Cons:**
- More complex implementation
- Need to handle MCP protocol details
- Potentially more maintenance overhead

### Option B: Use Existing MCP SDK/Library (Selected)

**Description:** Leverage an existing MCP client library (if available) or use the Notion MCP server's recommended client approach.

**Pros:**
- Faster development with proven code
- Better error handling out of the box
- Community support and documentation
- Protocol updates handled by library maintainers

**Cons:**
- Dependency on external package
- May include unused features
- Potential bundle size increase

**Rationale:** Using an existing MCP client library (if available) will accelerate development and reduce bugs by leveraging battle-tested code. Since this is the MVP phase, speed to market is critical, and we can always optimize later if bundle size becomes an issue.

### Option C: REST API Fallback

**Description:** If MCP integration proves problematic, fall back to direct Notion REST API calls.

**Pros:**
- Well-documented official API
- No MCP server dependency
- Simpler mental model

**Cons:**
- Contradicts product decision to use MCP architecture
- Would require OAuth setup and token management
- Less future-proof than MCP approach

**Rationale:** This is a backup option only if MCP proves technically infeasible. The product decision already established MCP as the preferred integration method.

## External Dependencies

### Required Dependencies

- **@raycast/api** (Latest)
  - **Purpose:** Raycast extension framework and UI components
  - **Justification:** Required for any Raycast extension

- **@raycast/utils** (if available)
  - **Purpose:** Utility functions for common Raycast patterns
  - **Justification:** Simplifies state management and async operations

### MCP Client Dependency (To Be Determined)

- **Dependency Name:** TBD (research needed)
  - **Purpose:** MCP protocol client for communicating with Notion MCP server
  - **Justification:** Enables connection to Notion via MCP without implementing protocol from scratch
  - **Alternative:** If no suitable library exists, implement minimal MCP client

### Development Dependencies

- **typescript** (^5.0.0)
  - **Purpose:** Type checking and compilation
  - **Justification:** Required by tech stack

- **@types/node** (Latest compatible)
  - **Purpose:** Node.js type definitions
  - **Justification:** Required for TypeScript Node.js development

- **jest** (Latest)
  - **Purpose:** Unit testing framework
  - **Justification:** Established testing standard per tech stack

- **@types/jest** (Latest)
  - **Purpose:** Jest type definitions
  - **Justification:** TypeScript support for Jest

## Implementation Architecture

### File Structure

```
src/
├── bookmark-capture.tsx          # Main command entry point
├── utils/
│   ├── safari.ts                 # Safari AppleScript integration
│   ├── notion-client.ts          # MCP server client wrapper
│   └── types.ts                  # TypeScript type definitions
└── __tests__/
    ├── safari.test.ts
    └── notion-client.test.ts
```

### Data Flow

1. User triggers Raycast command → `bookmark-capture.tsx`
2. Component mounts → calls `safari.ts` to get current URL/title
3. Form renders with pre-filled data
4. User fills in tags/notes → submits form
5. `notion-client.ts` searches for Bookmarks database
6. If found, create page with properties via MCP
7. Show success toast or error message

### Error Handling Strategy

- **Safari Errors:** Show friendly error toast: "Please open Safari and navigate to a page first"
- **MCP Errors:** Show error toast with actionable message: "Cannot connect to Notion. Please ensure MCP server is running"
- **Database Errors:** Show error toast: "Bookmarks database not found in your Notion workspace"
- **Validation Errors:** Inline field validation with red text

### Performance Considerations

- Safari URL/title fetch should complete in <200ms
- Form should render instantly with loading states
- MCP database search should timeout after 5 seconds
- Overall operation target: <5 seconds from command to saved bookmark
