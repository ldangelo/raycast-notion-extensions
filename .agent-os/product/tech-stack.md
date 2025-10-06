# Technical Stack

> Last Updated: 2025-10-06
> Version: 1.0.0

## Core Technologies

**Language:** TypeScript 5.x (latest) - TypeScript only, no Python
**Runtime:** Node.js (required by Raycast)
**Application Framework:** Raycast API (latest)
**UI Framework:** React (required by Raycast)
**CSS Framework:** Raycast native styling

**Architecture:** Client-side extension (no separate backend server)

## Package Managers (CRITICAL - DO NOT CHANGE)

**JavaScript Package Manager:** npm

⚠️ **IMPORTANT**: Always use the package managers specified above.
- JavaScript: Use `npm` (NOT yarn or pnpm unless Raycast updates requirements)

## Development Environment

**Project Structure:** raycast-extension
**Extension Type:** Raycast Command Extension

### Startup Commands

**Development:** `npm run dev`
**Build:** `npm run build`

**Quick Start:** Run `npm run dev` to start development mode with hot reload

### Environment Files

- **Extension Config:** `package.json` (contains Raycast extension manifest)
- **TypeScript Config:** `tsconfig.json`

## Testing Strategy

**Unit Testing:** Jest
**Type Checking:** TypeScript compiler (tsc)
**E2E Testing:** Manual testing in Raycast

## Additional Configuration

**UI Component Library:** @raycast/api (Raycast native components)
**Icon Library:** @raycast/api (Raycast SF Symbols and custom assets)
**MCP Integration:** Notion MCP Server

## Integration & APIs

**Notion Integration:** MCP Server (Model Context Protocol)
**Safari Integration:** AppleScript/JXA for current page URL
**Local Storage:** Raycast Cache API

## Repository

**Code Repository:** https://github.com/[username]/raycast-notion-extensions (to be created)

## Extension Structure

```
/
├── src/
│   ├── bookmark-capture.tsx     # Quick bookmark command
│   ├── create-note.tsx          # Quick note creation
│   ├── search-databases.tsx     # Database search command
│   └── utils/
│       ├── notion-client.ts     # MCP server integration
│       ├── safari.ts            # Safari URL capture
│       └── types.ts             # TypeScript types
├── assets/
│   └── command-icons/
├── package.json                 # Extension manifest
└── tsconfig.json
```

## Development Workflow

1. Run `npm install` to install dependencies
2. Run `npm run dev` to start development with hot reload
3. Test in Raycast by opening commands
4. Run `npm run build` before publishing

---

**⚠️ AGENT OS REMINDER**: Before making ANY changes to package management, startup commands, or environment configuration, ALWAYS check this file first to maintain consistency.
