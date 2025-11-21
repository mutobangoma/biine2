/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7BB12F",     // Main Biine green
          dark: "#629227",        // Hover green
          light: "#DFF0C7",       // Tag/chip background
        },
        graybg: "#F6F7F9",         // Background color
        bordergray: "#E5E7EB",     // Border color
      },

      borderRadius: {
        pill: "999px", // For Biine pill buttons & chips
      },

      boxShadow: {
        biine: "0 2px 6px rgba(0,0,0,0.08)", // Soft card shadow
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
