import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

import { architectureSchema, type Architecture } from "@/content/schemas/architecture.schema";

const contentRoot = join(process.cwd(), "content", "architecture");

let cachedArchitectures: Architecture[] | null = null;

export function loadAllArchitectures(): Architecture[] {
  if (cachedArchitectures) return cachedArchitectures;

  if (!existsSync(contentRoot)) {
    cachedArchitectures = [];
    return cachedArchitectures;
  }

  const files = readdirSync(contentRoot, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name);

  cachedArchitectures = files.map((file) => {
    const filePath = join(contentRoot, file);
    const raw = readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw) as unknown;
    return architectureSchema.parse(data);
  });

  return cachedArchitectures;
}
