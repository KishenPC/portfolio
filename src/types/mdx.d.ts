declare module "*.mdx" {
  import type { JSX } from "react";

  const MDXComponent: (props: Record<string, unknown>) => JSX.Element;
  export default MDXComponent;
}
