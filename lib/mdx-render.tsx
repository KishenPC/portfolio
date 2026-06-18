import { ReactNode } from "react";

function parseMarkdown(content: string): ReactNode[] {
  const blocks = content.split(/\n\n+/);
  const elements: ReactNode[] = [];

  blocks.forEach((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return;

    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="font-davinci text-2xl font-medium text-ink mt-96 mb-20 leading-[1.33]"
        >
          {trimmed.replace(/^## /, "")}
        </h2>
      );
    } else if (trimmed.startsWith("# ")) {
      elements.push(
        <h1
          key={i}
          className="font-davinci text-3xl font-medium text-ink mt-96 mb-20 leading-[1.1]"
        >
          {trimmed.replace(/^# /, "")}
        </h1>
      );
    } else if (trimmed.startsWith("- ")) {
      const items = trimmed
        .split("\n")
        .filter((line) => line.trim().startsWith("- "));
      elements.push(
        <ul key={i} className="list-disc pl-20 mb-20 space-y-8">
          {items.map((item, j) => (
            <li
              key={j}
              className="font-helvetica-now text-base text-ink leading-[1.5]"
            >
              {formatInline(item.replace(/^- /, ""))}
            </li>
          ))}
        </ul>
      );
    } else {
      elements.push(
        <p
          key={i}
          className="font-helvetica-now text-base text-ink leading-[1.5] mb-20"
        >
          {formatInline(trimmed)}
        </p>
      );
    }
  });

  return elements;
}

function formatInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-helvetica-now font-medium">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

interface MdxContentProps {
  content: string;
}

export default function MdxContent({ content }: MdxContentProps) {
  const elements = parseMarkdown(content);
  return <div className="max-w-[70ch]">{elements}</div>;
}
