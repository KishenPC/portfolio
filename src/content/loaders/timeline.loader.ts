import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

import { timelineEventSchema, type TimelineEvent } from "@/content/schemas/timeline.schema";

const contentRoot = join(process.cwd(), "content", "timeline", "timeline.json");

let cachedTimeline: TimelineEvent[] | null = null;

export function loadTimeline(): TimelineEvent[] {
  if (cachedTimeline) return cachedTimeline;

  if (!existsSync(contentRoot)) {
    cachedTimeline = [];
    return cachedTimeline;
  }

  const raw = readFileSync(contentRoot, "utf-8");
  const data = JSON.parse(raw) as unknown[];

  if (!Array.isArray(data)) {
    throw new Error("Timeline data must be an array");
  }

  cachedTimeline = data.map((item) => timelineEventSchema.parse(item));
  return cachedTimeline;
}
