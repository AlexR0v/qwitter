/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        'bg-color': '#fefcff',
        'q-blue': '#1d9bf0',
        'light-black': 'rgba(0,0,0,0.5)',
        'q-gray': '#536471',
      },
    },
  },
  plugins: [],
}
