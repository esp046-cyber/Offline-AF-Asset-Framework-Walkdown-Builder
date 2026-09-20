/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        graphite: {
          950: '#0a0e14',
          900: '#0f151d',
          800: '#161d27',
          700: '#1f2a37',
          600: '#2b3847',
          500: '#3d4d5f'
        },
        signal: {
          amber: '#f59e0b',
          green: '#22c55e',
          red: '#ef4444',
          blue: '#38bdf8'
        }
      },
      fontFamily: {
        industrial: ['"Segoe UI"', 'Roboto', 'system-ui', 'sans-serif']
      },
      minHeight: {
        touch: '56px'
      }
    }
  },
  plugins: []
}
