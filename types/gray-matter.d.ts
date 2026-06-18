declare module "gray-matter" {
  interface GrayMatterResult {
    data: { [key: string]: unknown };
    content: string;
  }
  function matter(
    input: string | Buffer,
    options?: Record<string, unknown>
  ): GrayMatterResult;
  export = matter;
}
