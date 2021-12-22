module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 10s ease-in-out infinite',
      },
      backgroundImage: {
        'main': "url(https://images.hdqwalls.com/download/dark-evening-light-pink-road-stars-4k-60-1920x1080.jpg)"
      }
    }
  },
  plugins: [],
}