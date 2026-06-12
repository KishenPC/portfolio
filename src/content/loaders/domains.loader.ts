import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

import { domainSchema, type Domain } from "@/content/schemas/domain.schema";

const contentRoot = join(process.cwd(), "content", "domains");

let cachedDomains: Domain[] | null = null;

export function loadDomains(): Domain[] {
  if (cachedDomains) return cachedDomains;

  if (!existsSync(contentRoot)) {
    cachedDomains = [];
    return cachedDomains;
  }

  const files = readdirSync(contentRoot, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name);

  cachedDomains = files.map((file) => {
    const filePath = join(contentRoot, file);
    const raw = readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw) as unknown;
    return domainSchema.parse(data);
  });

  return cachedDomains;
}
