/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
      },
      colors: {
        brand: {
          red: "#b61f26",
          dark: "#1d1d1d",
          gold: "#f8c74d",
          cream: "#f7f0e8",
        },
      },
    },
  },
  plugins: [],
};
