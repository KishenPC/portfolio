import type { ReactNode } from "react";

type MainContentProps = {
  children: ReactNode;
};

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex flex-1 flex-col" id="main-content" tabIndex={-1}>
      {children}
    </main>
  );
}
