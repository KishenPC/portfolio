import Image from "next/image";
import type { ProjectImage as ProjectImageData } from "@/lib/types";

/**
 * ProjectImage — a project screenshot with a graceful placeholder state.
 *
 * When `image.src` is empty (placeholder data, pre-Task-22), renders a
 * `role="img"` box with the alt text as its accessible label and a visible
 * mono placeholder label — matching the frozen wireframe's `Placeholder`.
 * When `src` is present, renders `next/image` (`fill`, `object-cover`) inside
 * a reserved-aspect-ratio wrapper so layout space is always reserved and
 * CLS stays at zero. An optional `blur` data URL enables blur-up loading.
 *
 * The 16/10 aspect ratio is fixed at the primitive level so consumers get
 * consistent framing; the surrounding layout controls width. Descriptive
 * alt text is always passed through (images are evidence, not decoration).
 */
export interface ProjectImageProps {
  image: ProjectImageData;
  /** Visible label inside the placeholder box when `src` is empty. */
  placeholderLabel?: string;
  className?: string;
}

export function ProjectImage({
  image,
  placeholderLabel = "[Screenshot]",
  className,
}: ProjectImageProps) {
  const frame = ["aspect-[16/10] border border-line", className]
    .filter(Boolean)
    .join(" ");

  if (!image.src) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={["bg-placeholder flex items-center justify-center", frame]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="font-mono text-caption text-ink-3">
          {placeholderLabel}
        </span>
      </div>
    );
  }

  return (
    <div className={["relative bg-placeholder", frame].filter(Boolean).join(" ")}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 1280px"
        {...(image.blur
          ? { placeholder: "blur" as const, blurDataURL: image.blur }
          : {})}
      />
    </div>
  );
}
