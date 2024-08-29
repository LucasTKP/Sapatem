import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      colors: {
        background: "#EBEBEB",
        primary: "#7B3C1B",
        secondary: "#E1876A",
        terciary: "#7B3C1B",
        ...defaultTheme.colors,
      },
      screens: {
        xsm: "475px",
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
};
export default config;
