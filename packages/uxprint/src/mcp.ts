import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { renderDesignMd } from "./design-md.js";
import { loadAllPrints, loadPrint, searchPrints } from "./library.js";

export async function runMcpServer(version: string): Promise<void> {
  const server = new McpServer({ name: "uxprint", version });

  server.registerTool(
    "list_prints",
    {
      description:
        "List the UI/UX prints in the uxprint library (recorded design systems of real platforms). Pass a query to search by name, tag, category or theme.",
      inputSchema: { query: z.string().optional().describe('Words to match, e.g. "dark dashboard"') },
    },
    async ({ query }) => {
      const all = loadAllPrints();
      const prints = query ? searchPrints(all, query) : all;
      const rows = prints.map(({ slug, name, category, theme, tags, summary }) => ({ slug, name, category, theme, tags, summary }));
      return { content: [{ type: "text", text: JSON.stringify(rows, null, 2) }] };
    },
  );

  server.registerTool(
    "get_print",
    {
      description:
        "Get one print. Format design-md (default) is the specification to follow when building UI; json is the structured record with every token.",
      inputSchema: {
        slug: z.string().describe("The print's slug from list_prints"),
        format: z.enum(["design-md", "json"]).default("design-md"),
      },
    },
    async ({ slug, format }) => {
      try {
        const print = loadPrint(slug);
        const text = format === "json" ? JSON.stringify(print, null, 2) : renderDesignMd(print);
        return { content: [{ type: "text", text }] };
      } catch (error) {
        return { isError: true, content: [{ type: "text", text: (error as Error).message }] };
      }
    },
  );

  await server.connect(new StdioServerTransport());
}
