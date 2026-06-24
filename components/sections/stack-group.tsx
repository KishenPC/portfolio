import type { StackGroup as StackGroupData } from "@/lib/types";
import { Heading } from "@/components/typography";
import { LogoPlaceholder } from "@/components/stack/logo-placeholder";

export interface StackGroupProps {
  group: StackGroupData;
}

/**
 * StackGroup — a definition-list row mapping a technology category to its
 * items. Mirrors the frozen wireframe's rhythm: hairline top border, 12-col
 * grid with the group label at `col-span-3` and the logo grid at
 * `col-span-9`, items wrapping with `gap-3`.
 *
 * The label is a semantic `<h3>` so the category is announced as a heading
 * (screen-reader navigation aid); the items themselves are a flat flex-wrap
 * rather than a list because logos read as a visual cluster, not a sequenced
 * enumeration. Each `LogoPlaceholder` carries its own accessible name. On
 * mobile the grid collapses and the label stacks above the items.
 */
export function StackGroup({ group }: StackGroupProps) {
  return (
    <div className="grid gap-6 border-t border-line pt-8 md:grid-cols-12 md:gap-10 md:items-start">
      <div className="md:col-span-3">
        <Heading as="h3" scale="card-title">
          {group.name}
        </Heading>
      </div>

      <div className="flex flex-wrap gap-3 md:col-span-9">
        {group.items.map((item) => (
          <LogoPlaceholder key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
