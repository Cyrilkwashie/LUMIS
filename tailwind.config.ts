import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        offwhite: "#F7F7F7",
        warm: "#F0EDE8",
        heading: "#0A0A0A",
        body: "#3A3A3A",
        accent: "#2563EB",
        grey: "#9CA3AF",
        border: "#E5E7EB",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0,0,0,0.06)",
        card: "0 1px 4px rgba(0,0,0,0.07)",
      },
      borderRadius: {
        DEFAULT: "6px",
        lg: "8px",
      },
      spacing: {
        section: "80px",
      },
    },
  },
  plugins: [],
};
export default config;
