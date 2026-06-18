import type { Config } from "tailwindcss";
import tokens from "./tokens.json";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        putty: tokens.color.putty.$value,
        ink: tokens.color.ink.$value,
        bone: tokens.color.bone.$value,
        chalk: tokens.color.chalk.$value,
        vellum: tokens.color.vellum.$value,
        graphite: tokens.color.graphite.$value,
        ash: tokens.color.ash.$value,
        paper: tokens.color.paper.$value,
      },
      fontFamily: {
        davinci: ["var(--font-davinci)", "serif"],
        "helvetica-now": ["var(--font-helvetica-now)", "sans-serif"],
      },
      spacing: {
        4: "4px",
        16: "16px",
        20: "20px",
        28: "28px",
        32: "32px",
        36: "36px",
        40: "40px",
        52: "52px",
        60: "60px",
        96: "96px",
        168: "168px",
      },
      borderRadius: {
        sm: "2px",
        md: "9px",
        lg: "28.8px",
      },
      fontSize: {
        xs: ["9px", "1.5"],
        sm: ["12px", "1.5"],
        base: ["15px", "1.5"],
        lg: ["16px", "1.5"],
        xl: ["22px", "1.33"],
        "2xl": ["26px", "1.33"],
        "3xl": ["43px", "1.1"],
        "4xl": ["52px", "1.0"],
        "5xl": ["94px", "1.1"],
        "6xl": ["374px", "0.84"],
      },
      letterSpacing: {
        tight: "-0.0090em",
        tighter: "-0.0050em",
        none: "0em",
      },
    },
  },
  plugins: [],
} satisfies Config;
