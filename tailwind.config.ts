import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stardew Valley color palette
        cream: "#F4E4C1",
        brown: "#3E2723",
        accent: "#228B22",
        error: "#DC143C",
        // Additional shades
        "brown-light": "#5D4037",
        "brown-dark": "#2E1F1A",
        "accent-light": "#32CD32",
        "accent-dark": "#1B5E20",
      },
      fontFamily: {
        pixel: ["var(--font-press-start-2p)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;