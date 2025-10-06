# Product Roadmap

> Last Updated: 2025-10-06
> Version: 1.0.0
> Status: Planning

## Phase 1: Foundation & MVP (2 weeks)

**Goal:** Establish core infrastructure and deliver basic bookmark capture functionality
**Success Criteria:** User can capture Safari bookmarks to Notion from Raycast

### Must-Have Features

- [ ] Raycast extension project scaffolding - Setup package.json, TypeScript config, and basic project structure `S`
- [ ] MCP server connection - Establish connection to installed Notion MCP server `M`
- [ ] Safari URL capture - Implement AppleScript/JXA to get current Safari page URL `S`
- [ ] Basic bookmark command - Create simple bookmark capture command with hardcoded fields `M`
- [ ] Bookmarks database detection - Auto-discover and connect to Bookmarks database `S`

### Should-Have Features

- [ ] Error handling - Basic error messages for MCP connection failures `XS`
- [ ] Loading states - Show loading indicators during API calls `XS`

### Dependencies

- Notion MCP server must be installed and configured
- Access to Notion workspace with Bookmarks database

## Phase 2: Smart Form & Field Mapping (1 week)

**Goal:** Implement intelligent form generation that matches Bookmarks database schema
**Success Criteria:** Form automatically adapts to Bookmarks database field structure

### Must-Have Features

- [ ] Database schema retrieval - Fetch Bookmarks database properties via MCP `S`
- [ ] Dynamic form generation - Create form fields based on database schema `M`
- [ ] Field type mapping - Support text, URL, select, multi-select, date field types `M`
- [ ] Form validation - Validate required fields before submission `S`

### Should-Have Features

- [ ] Default values - Pre-fill URL field with Safari page, auto-set date `S`
- [ ] Field descriptions - Show helpful hints for each form field `XS`

### Dependencies

- Phase 1 MCP connection must be stable
- Understanding of all Bookmarks database field types

## Phase 3: Quick Note Creation (1 week)

**Goal:** Enable rapid note creation directly from Raycast
**Success Criteria:** User can create Notion pages with templates in under 5 seconds

### Must-Have Features

- [ ] Create page command - New Raycast command for quick note creation `M`
- [ ] Page title input - Simple form for page title `XS`
- [ ] Parent page selection - Choose where to create the new page `S`
- [ ] Basic content support - Support for plain text content `S`

### Should-Have Features

- [ ] Note templates - Pre-defined templates for common note types `M`
- [ ] Quick capture mode - Minimal form for fastest possible note creation `S`
- [ ] Tag support - Add tags/properties to new notes `S`

### Dependencies

- Phase 2 form infrastructure can be reused

## Phase 4: Database Search & Navigation (1 week)

**Goal:** Provide fast search across all Notion databases
**Success Criteria:** User can find any Notion content in under 3 seconds

### Must-Have Features

- [ ] Search command - New Raycast command for Notion search `M`
- [ ] Multi-database search - Search across Bookmarks and other databases `M`
- [ ] Result list view - Display search results with titles and previews `S`
- [ ] Open in Notion - Action to open selected item in Notion app/web `XS`

### Should-Have Features

- [ ] Search filters - Filter by database, date, tags `M`
- [ ] Recent items - Show recently accessed items `S`
- [ ] Fuzzy search - Match partial queries intelligently `S`
- [ ] Preview content - Show page/item preview in Raycast `M`

### Dependencies

- MCP server search capabilities
- Understanding of Notion's search API limitations

## Phase 5: Polish & Advanced Features (2 weeks)

**Goal:** Add refinements, optimizations, and power-user features
**Success Criteria:** Extension feels polished and handles edge cases gracefully

### Must-Have Features

- [ ] Error recovery - Graceful handling of network errors, auth issues `M`
- [ ] Offline detection - Detect and inform user when offline `S`
- [ ] Performance optimization - Cache database schemas, lazy load results `M`
- [ ] User preferences - Store favorite databases, default templates `S`

### Should-Have Features

- [ ] Keyboard shortcuts - Custom shortcuts for frequent actions `S`
- [ ] Bulk operations - Select multiple items for batch actions `M`
- [ ] Export/Share - Quick share or export bookmark collections `M`
- [ ] Database statistics - Show bookmark counts, recent activity `S`
- [ ] Multi-workspace support - Switch between Notion workspaces `L`
- [ ] Custom field mappings - Let users customize form field mappings `L`

### Dependencies

- User feedback from Phases 1-4
- Performance profiling data

---

## Release Strategy

- **v0.1.0** (Phase 1): Private alpha - Basic bookmark capture
- **v0.2.0** (Phase 2): Private beta - Smart forms
- **v0.3.0** (Phase 3): Public beta - Note creation added
- **v0.4.0** (Phase 4): Release candidate - Full search
- **v1.0.0** (Phase 5): Public release - Production ready

## Future Considerations (Post-v1.0)

- Browser integration beyond Safari (Chrome, Firefox)
- Advanced Notion features (databases, relations, rollups)
- Collaboration features (share extensions, team templates)
- AI-powered content suggestions
- Integration with other Raycast extensions
