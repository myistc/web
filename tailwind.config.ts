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
        primary: {
          DEFAULT: "#15803d",
          dark: "#14532d",
          light: "#f0fdf4",
        },
        secondary: "#f8fafc",
      },
    },
  },
  plugins: [],
};

export default config;
