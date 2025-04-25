// tailwind.config.js
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          hiq: {
            red: '#FF4C4C',
            orange: '#FF9900',
            yellow: '#FFCC00',
            green: '#33CC33',
            blue: '#3399FF',
            purple: '#9933FF',
          },
        },
        fontFamily: {
          display: ['"Poppins"', 'sans-serif'],
          body: ['"Inter"', 'sans-serif'],
        },
        borderRadius: {
          xl: '1rem',
          '2xl': '1.5rem',
        },
        boxShadow: {
          soft: '0 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    plugins: [],
  }
  