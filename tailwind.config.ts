import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#1B4332",
        "forest-light": "#2D5A43",
        "forest-dark": "#0F2A1E",
        sage: "#74A57F",
        "sage-light": "#A8C9A0",
        "sage-dark": "#5A8A65",
        cream: "#FAF7F0",
        "cream-dark": "#F0EBE0",
        terracotta: "#C05621",
        "terracotta-light": "#D97B4A",
        "terracotta-dark": "#9A4419",
        gold: "#D4A853",
        "gold-light": "#E5C47A",
        "gold-dark": "#B8923E",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
