// Import the defaultTailwindCSS theme for extending its properties
const defaultTheme = require("tailwindcss/defaultTheme");

// Export the configuration object for Tailwind CSS
module.exports = {
    mode: "jit",
    // Define the content sources for PurgeCSS (removes unused CSS in production)
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./utils/**/*.{js,ts,jsx,tsx,mdx}"
    ],

    // Define the customizations to the default theme
    theme: {
        // Extend various properties of the default theme
        extend: {
            // Define new background image properties
            backgroundImage: {
                // Radial gradient with dynamic stops
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                // Conic gradient with dynamic stops
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            // Define new screen sizes, adding "xs" to default screen sizes
            screens: {
                xs: "300px", // Custom extra-small screen size
                ...defaultTheme.screens, // Include default screen sizes
            },
        },
    },

    // Define any plugins for Tailwind CSS
    plugins: [],
};
