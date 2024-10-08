/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'class', // This enables dark mode variant
  theme: {
    extend: {
      colors: {
        primary: "#f6e7ad",
        secondary: {
          DEFAULT: "#f26e00",
          100: "#00c8d8",
          200: "#94e700",
        },
        red: {
          500: "#FF0000",
        },
        black: {
          DEFAULT: "#0b0835",
          100: "rgb(0, 231, 255)",
          200: "rgb(255, 0, 231)",
        },
        gray: {
          100: "#f5f5f5",
        },
        pinata: {
          purple: '#5c5cd6',
          'light-purple': '#7474e8',
          dark: '#1a1a2e',
          darker: '#13132a',
          light: '#ffffff',
          'off-white': '#f5f5f5',
          yellow: '#ffd166',
          pink: '#ef476f',
          green: '#06d6a0',
        },
      },
      fontFamily: {
        bold: ["Poppins_700Bold", "sans-serif"],
        standard: ["Nunito_400Regular", "Roboto", "sans-serif"],
        fun: ["Helvetica", "sans-serif"],
        "fun-second": ["Unbounded_400Regular", "Helvetica", "sans-serif"],
        "teacher-name": ["Sen_400Regular", "Helvetica", "sans-serif"],
      },
      backgroundColor: {
        'light': '#ffffff',
        'dark': '#1a1a2e',
      },
      textColor: {
        'light': '#1a1a2e',
        'dark': '#ffffff',
      },
      themeModes: {
        light: {
          'bg-primary': 'bg-pinata-light',
          'bg-secondary': 'bg-pinata-off-white',
          'text-primary': 'text-pinata-dark',
          'text-secondary': 'text-pinata-purple',
          'accent': 'bg-pinata-purple',
        },
        dark: {
          'bg-primary': 'bg-pinata-dark',
          'bg-secondary': 'bg-pinata-darker',
          'text-primary': 'text-pinata-light',
          'text-secondary': 'text-pinata-light-purple',
          'accent': 'bg-pinata-purple',
        },
      },
    },
  },
  plugins: [require("tailwindcss-claymorphism")],
};

// Export the theme objects
module.exports.lightTheme = module.exports.theme.extend.themeModes.light;
module.exports.darkTheme = module.exports.theme.extend.themeModes.dark;
