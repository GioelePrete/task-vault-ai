// This module.exports statement is used to export a configuration object
// that will be used by PostCSS plugins to process your CSS code.

module.exports = {
    // The 'plugins' property contains an object of PostCSS plugins
    plugins: {
        // The 'tailwindcss' plugin integrates Tailwind CSS with PostCSS.
        // Tailwind CSS is a utility-first CSS framework that allows you to
        // quickly build custom designs by composing utility classes.
        tailwindcss: {},

        // The 'autoprefixer' plugin automatically adds vendor prefixes to your
        // CSS code, ensuring better cross-browser compatibility. It analyzes
        // your code and adds prefixes for properties that require them.
        autoprefixer: {},
    },
};
