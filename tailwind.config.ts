import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brandPrimary: "#3366B3",
        brandComplementary: "#B35C33",
        brandAnalogousGreen: "#33B366",
        brandAnalogousPurple: "#6633B3",
        brandNeutralWhite: "#FFFFFF",
        brandNeutralBlack: "#000000",
        brandNeutralGray: "#CCCCCC",
      },
    },
  },
  plugins: [
    nextui(),
  ],
} satisfies Config;
