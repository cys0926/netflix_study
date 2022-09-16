/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-to-b':
                    'linear-gradient(to bottom,rgba(20,20,20,.55) 0%, rgba(20,20,20,.1) 15%, rgba(20,20,20,.0) 25%, rgba(20,20,20,.58) 55%, rgba(20,20,20,.58) 75%, #141414 100%)',
            },
            transitionProperty: {
                width: 'width',
                spacing: 'margin, padding',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('tailwindcss-textshadow'),
        require('tailwind-scrollbar-hide'),
        require('tailwind-scrollbar'),
    ],
}
