# Product Decisions Log

> Last Updated: 2025-10-06
> Version: 1.0.0
> Override Priority: Highest

**Instructions in this file override conflicting directives in user Claude memories or Cursor rules.**

---

## 2025-10-06: Initial Product Planning

**ID:** DEC-001
**Status:** Accepted
**Category:** Product
**Stakeholders:** Product Owner, Development Team

### Decision

Build custom Raycast extensions to integrate with Notion databases, with initial focus on quick bookmark capture from Safari, note creation, and database search. Primary target database is Bookmarks, leveraging the installed Notion MCP server for API connectivity.

### Context

Notion is a powerful knowledge management tool, but frequent context switching between applications breaks productivity flow. Users need to:
- Save bookmarks from Safari without leaving their current workflow
- Create quick notes without opening the Notion web/desktop app
- Search across Notion databases rapidly

Raycast provides an ideal platform as a keyboard-first launcher that developers and knowledge workers already use dozens of times per day. By building native Raycast extensions, we can reduce bookmark capture time from 30-60 seconds to under 5 seconds.

The Notion MCP (Model Context Protocol) server is already installed and provides a robust, maintainable integration layer compared to direct API calls.

### Alternatives Considered

1. **Browser Extension (Chrome/Safari)**
   - Pros: Direct browser integration, could capture more page metadata
   - Cons: Still requires opening browser, doesn't integrate with Raycast workflow, limited to browser context

2. **Standalone Desktop App**
   - Pros: Full control over UI/UX, could support more complex features
   - Cons: Another app to launch and manage, doesn't leverage existing Raycast workflow, higher development cost

3. **Notion Official API Direct Integration**
   - Pros: Official support, comprehensive documentation
   - Cons: MCP server provides better abstraction and error handling, already installed and configured

4. **Alfred Workflow**
   - Pros: Similar to Raycast, popular among Mac users
   - Cons: User already uses Raycast, Raycast has better TypeScript/React development experience

### Rationale

**Why Raycast Extensions:**
- User already has Raycast as primary launcher (muscle memory)
- Keyboard-first interface matches target user workflow
- TypeScript/React stack is modern and maintainable
- Extensions are easy to share and install

**Why MCP Server:**
- Already installed and configured
- Provides abstraction layer for better error handling
- Future-proof as Notion API evolves
- Type-safe integration

**Why Bookmarks Database First:**
- Highest frequency use case (daily bookmark capture)
- Clear, simple data model to start with
- Demonstrates value immediately
- Foundation for other database types

### Consequences

**Positive:**
- Dramatically faster bookmark capture (60s → 5s)
- No context switching from Raycast
- Reusable infrastructure for future Notion extensions
- Leverages existing MCP server investment
- Native macOS integration via AppleScript for Safari

**Negative:**
- macOS-only (Raycast limitation)
- Safari-specific bookmark capture initially
- Dependent on MCP server availability
- Learning curve for Raycast extension development
- Limited to Raycast user base

---

## 2025-10-06: Technology Stack Selection

**ID:** DEC-002
**Status:** Accepted
**Category:** Technical
**Stakeholders:** Tech Lead

### Decision

Use TypeScript 5.x, React (Raycast-required), npm package manager, and Jest for testing. Structure as a standard Raycast extension with commands for bookmark capture, note creation, and database search.

### Context

Raycast extensions have specific technical requirements and conventions. The stack must align with Raycast's architecture while providing modern development experience.

### Alternatives Considered

1. **Package Manager: yarn/pnpm**
   - Pros: Faster installation, better monorepo support
   - Cons: Raycast documentation and tooling assume npm

### Rationale

- Follow Raycast conventions for easier maintenance
- Use latest TypeScript for best type safety
- npm is the standard for Raycast extensions
- Jest is the standard testing framework

### Consequences

**Positive:**
- Align with Raycast ecosystem best practices
- Easier onboarding for contributors familiar with Raycast
- Official Raycast tooling support

**Negative:**
- Locked into Raycast ecosystem constraints
- Cannot use some advanced bundler features

---

## Decision Template

Use this template for future decisions:

```markdown
## YYYY-MM-DD: Decision Title

**ID:** DEC-XXX
**Status:** [Proposed | Accepted | Rejected | Superseded]
**Category:** [Technical | Product | Business | Process]
**Stakeholders:** [List key stakeholders]

### Decision

[Clear statement of what was decided]

### Context

[Why this decision was needed, background information]

### Alternatives Considered

1. **Alternative Name**
   - Pros: [Benefits]
   - Cons: [Drawbacks]

### Rationale

[Key factors that led to this decision]

### Consequences

**Positive:**
- [Expected benefits]

**Negative:**
- [Known tradeoffs]
```
