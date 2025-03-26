/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "tropical-vibes": "#FF6347", // Couleur principale
        "color-blanc-custom": "#FFF5EE",
        "couleur-secondaire": "#FFEB3B",
        "couleur-accent": "#008080",
      },
      boxShadow: {
        custom: "0 10px 15px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
