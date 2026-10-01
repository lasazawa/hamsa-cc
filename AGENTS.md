# Hamsa Storybook agent guidance

When working on UI components, use the `storybook` MCP tools (Storybook must be running at http://localhost:6006) before answering or taking action.

- Never invent component props. Use `docs-list` / `docs-show` to confirm APIs.
- Use `get-storybook-story-instructions` when creating or updating stories.
- For Figma sync, follow `.cursor/rules/storysync.mdc`: push/diff Storybook + tokens against a Figma file key via Storybook MCP + Figma MCP.
