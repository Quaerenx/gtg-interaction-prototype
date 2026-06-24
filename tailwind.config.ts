import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./tests/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gtg: {
          black: "#040404",
          charcoal: "#181817",
          graphite: "#2b2b28",
          gray: "#89867f",
          warm: "#f4efe4",
          accent: "#f02018"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "Helvetica", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
