# Notion Bookmark Capture for Raycast

Quickly capture Safari bookmarks to your Notion Bookmarks database with automatic URL and title detection.

## Features

- **Instant Capture**: Save the current Safari page to Notion with a single command
- **Auto-Fill**: Automatically captures URL and title from Safari
- **Tag Support**: Add comma-separated tags to organize your bookmarks
- **Smart Error Handling**: Clear error messages for Safari, MCP server, and database issues
- **Notion MCP Integration**: Leverages the Notion MCP server for reliable API access

## Prerequisites

Before using this extension, you need:

1. **Raycast** - [Download Raycast](https://www.raycast.com/)
2. **Notion Account** - Active Notion workspace
3. **Notion MCP Server** - Installed and configured
   - Install via: `npx @modelcontextprotocol/server-notion`
   - Configure with your Notion integration token
4. **Bookmarks Database in Notion** - A database named "Bookmarks" with the following properties:
   - `title` (Title property)
   - `URL` (URL property)
   - `Created` (Date property)
   - `Tags` (Multi-select property, optional)

## Installation

### From Source (Development)

1. Clone the repository:
   ```bash
   git clone https://github.com/ldangelo/raycast-notion-extensions.git
   cd raycast-notion-extensions/notion
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development mode:
   ```bash
   npm run dev
   ```

4. The extension will be installed in Raycast automatically

### From Raycast Store (Coming Soon)

Search for "Notion Bookmark Capture" in the Raycast Store.

## Setup

### 1. Create Bookmarks Database in Notion

1. Open Notion and create a new database
2. Name it "Bookmarks"
3. Add the following properties:
   - `title` - Title (default, comes with database)
   - `URL` - URL type
   - `Created` - Date type
   - `Tags` - Multi-select type (optional)

### 2. Configure Notion MCP Server

1. Install the Notion MCP server:
   ```bash
   npx -y @modelcontextprotocol/server-notion
   ```

2. Create a Notion integration:
   - Go to [Notion Integrations](https://www.notion.so/my-integrations)
   - Click "New integration"
   - Give it a name (e.g., "Raycast Bookmarks")
   - Select the workspace
   - Copy the "Internal Integration Token"

3. Share your Bookmarks database with the integration:
   - Open your Bookmarks database in Notion
   - Click "Share" in the top right
   - Search for your integration name
   - Click "Invite"

4. Configure the MCP server with your token (follow MCP server documentation)

## Usage

1. Open Safari and navigate to a page you want to bookmark
2. Trigger Raycast (default: `⌘ Space`)
3. Type "Capture Bookmark to Notion" or search for "bookmark"
4. The form will appear with pre-filled URL and title
5. (Optional) Add comma-separated tags: `productivity, tools, reference`
6. Press `⌘ Enter` to save or click "Save Bookmark"
7. You'll see a success notification when the bookmark is saved

## Keyboard Shortcuts

- `⌘ Enter` - Submit the form
- `Esc` - Cancel and close the form

## Features in Detail

### Auto-Fill Safari Data

The extension automatically captures:
- **URL**: The current Safari page URL
- **Title**: The page title (or URL if title is empty)
- **Timestamp**: Current date and time when you open the form

### Tag Support

Add tags to organize your bookmarks:
- Use comma-separated values: `productivity, tools, reference`
- Extra spaces are automatically trimmed
- Empty tags are filtered out

### Error Handling

The extension provides clear error messages for common issues:

**Safari Not Running**
```
Safari Error
Safari is not running. Please open Safari and navigate to a page.
```

**No Active Safari Window**
```
Safari Error
No active Safari window or tab. Please open a page in Safari.
```

**MCP Server Unavailable**
```
MCP Server Error
Cannot connect to Notion. Please ensure MCP server is running.
```

**Bookmarks Database Not Found**
```
Database Error
Bookmarks database not found in your Notion workspace.
```

## Development

### Project Structure

```
notion/
├── src/
│   ├── bookmark-capture.tsx          # Main command component
│   ├── utils/
│   │   ├── safari.ts                 # Safari AppleScript integration
│   │   ├── notion-client.ts          # MCP server client
│   │   └── types.ts                  # TypeScript type definitions
│   └── __tests__/
│       ├── safari.test.ts
│       ├── notion-client.test.ts
│       └── bookmark-capture-integration.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Building

```bash
# Build for production
npm run build

# Lint code
npm run lint

# Fix linting issues
npm run fix-lint
```

## Troubleshooting

### "Cannot connect to Notion MCP server"

**Causes:**
- MCP server is not running
- MCP server is not configured correctly
- Network connection issues

**Solutions:**
1. Verify MCP server is installed: `npx @modelcontextprotocol/server-notion --help`
2. Check MCP server configuration and Notion token
3. Restart the MCP server
4. Check your internet connection

### "Bookmarks database not found"

**Causes:**
- No database named "Bookmarks" in Notion
- Database not shared with integration
- Database name has different capitalization

**Solutions:**
1. Create a database named "Bookmarks" (exact name)
2. Share the database with your Notion integration
3. Verify the integration has access permissions

### "Safari is not running"

**Causes:**
- Safari is not open
- No Safari windows are open

**Solutions:**
1. Open Safari
2. Navigate to any webpage
3. Try the command again

### Form validation errors

**"Title is required"**
- The bookmark must have a title
- If Safari page has no title, the URL will be used as title

**"URL is required"**
- This shouldn't happen if Safari data loaded correctly
- Try refreshing the Safari page and trying again

## Technical Details

### Safari Integration

The extension uses AppleScript/JXA to communicate with Safari:
- `osascript` commands fetch URL and title
- Runs asynchronously to avoid blocking the UI
- Handles Safari not running and no active window cases

### Notion MCP Integration

Uses the Model Context Protocol (MCP) for Notion integration:
- Stdio transport for reliable communication
- Type-safe TypeScript implementation
- Automatic connection management and lazy initialization
- Comprehensive error handling

### TypeScript & Testing

- **TypeScript 5.x**: Strict type checking enabled
- **Jest**: Unit and integration testing
- **36 test cases**: Covering all major functionality
- **Test coverage**: 70%+ code coverage maintained

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests (`npm test`)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

MIT

## Author

ldangelo

## Acknowledgments

- Built with [Raycast API](https://developers.raycast.com/)
- Uses [Notion MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/notion)
- Inspired by the need for faster bookmark capture workflows
