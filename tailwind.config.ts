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
        "midnight": "#0f172a",
        "electric-blue": "#3b82f6",
        "electric-blue-hover": "#2563eb",
        "emerald": "#10b981",
        "emerald-light": "#34d399",
        "portal-gray": "#f8fafc",
        "portal-gray-dark": "#e2e8f0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
        "glass-hover": "0 12px 40px rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
        "glass-border": "0 0 0 1px rgba(255, 255, 255, 0.08)",
        "glow-emerald": "0 0 20px rgba(16, 185, 129, 0.3)",
      },
      animation: {
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "pulse-border": "pulse-border 2s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "btn-press": "btn-press 0.2s ease-out",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(16, 185, 129, 0.4)" },
          "50%": { opacity: "1", boxShadow: "0 0 0 8px rgba(16, 185, 129, 0)" },
        },
        "pulse-border": {
          "0%, 100%": { boxShadow: "0 0 0 1px rgba(59, 130, 246, 0.5)" },
          "50%": { boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(-4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "btn-press": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.98)" },
          "100%": { transform: "scale(1)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
