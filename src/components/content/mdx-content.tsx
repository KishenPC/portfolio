import { compileMDX } from "next-mdx-remote/rsc";
import { type JSX } from "react";

type MdxContentProps = {
  source: string;
};

export async function MdxContent({ source }: MdxContentProps): Promise<JSX.Element> {
  const { content } = await compileMDX({
    source,
  });

  return <>{content}</>;
}
