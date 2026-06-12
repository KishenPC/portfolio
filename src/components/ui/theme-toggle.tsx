"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const themeOptions = [
  { label: "System", value: "system" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
] as const;

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function useIsMounted() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const mounted = useIsMounted();

  return (
    <label className="text-muted-foreground inline-flex min-h-10 items-center gap-2 text-sm">
      <span className="sr-only">Theme</span>
      <select
        aria-label="Theme"
        className="border-border bg-background text-foreground min-h-10 rounded-sm border px-3 text-sm font-medium"
        disabled={!mounted}
        onChange={(event) => setTheme(event.target.value)}
        value={mounted ? (theme ?? "system") : "system"}
      >
        {themeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
