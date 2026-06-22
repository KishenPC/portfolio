/**
 * KeywordCluster — a row of monospace tag chips describing a project's
 * themes (e.g. "Full Stack", "Developer Experience"). Mirrors the frozen
 * wireframe's keyword cluster: hairline border, mono caption, `text-ink-2`.
 *
 * Reusable across both project templates; spacing above/below is owned by
 * the consumer so the primitive stays layout-agnostic. Accepts any count
 * of keywords and wraps gracefully on narrow viewports.
 */
export interface KeywordClusterProps {
  keywords: string[];
  className?: string;
}

export function KeywordCluster({ keywords, className }: KeywordClusterProps) {
  const classes = ["flex flex-wrap gap-2 p-0 list-none", className]
    .filter(Boolean)
    .join(" ");
  return (
    <ul className={classes}>
      {keywords.map((keyword) => (
        <li
          key={keyword}
          className="border border-line px-3 py-1 font-mono text-caption text-ink-2"
        >
          {keyword}
        </li>
      ))}
    </ul>
  );
}
