import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111116",
        charcoal: "#1b1b20",
        brass: "#b59a54",
        vellum: "#e7dfcf",
        ember: "#9f281f",
        fog: "#9b9990",
        concrete: "#b8b4aa",
        rust: "#7d3024",
        tar: "#08080a"
      },
      boxShadow: {
        glow: "0 0 35px rgba(185,154,91,0.18)"
      }
    }
  },
  plugins: []
};

export default config;
