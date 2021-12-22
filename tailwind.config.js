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
        'main': "url(https://source.unsplash.com/random/1920x1080?nature)"
      }
    }
  },
  plugins: [],
}