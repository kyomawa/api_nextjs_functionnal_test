import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1450px",
      },
    },
    extend: {
      screens: {
        xs: "400px",
        "3xl": "1700px",
        "2k": "1921px",
        "3k": "2561px",
        "4k": "3073px",
        "4.5k": "3458px",
        "5k": "3841px",
        "6k": "5121px",
        "8k": "6017px",
        "10k": "7681px",
        "12k": "10241px",
      },
      fontFamily: {
        sora: ["var(--font-sora)"],
      },
      colors: {
        primary: {
          "50": "#eafffc",
          "100": "#cafff8",
          "200": "#9cfff6",
          "300": "#57fff2",
          "400": "#0cfff8",
          "500": "#00e7ea",
          "600": "#00b8c4",
          "700": "#009aa6",
          "800": "#0b747f",
          "900": "#0e5f6b",
          "950": "#02404a",
          "1000": "#023139",
          "1050": "#001A1E",
        },
        secondary: "#343A40",
        neutral: {
          "10": "#fefefe",
          "150": "#eeeeee",
        },
        slate: {
          "150": "#eff2f7",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "sidebar-icon-selected": {
          "0%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
        loading: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.4s ease-out",
        "accordion-up": "accordion-up 0.4s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "sidebar-icon-selected": "sidebar-icon-selected 0.5s ease-in-out",
        loading: "loading 4.25s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
