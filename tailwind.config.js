module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    fontFamily: {
      'display': ['"Arima Madurai"', 'cursive'],
      'body': ['"Tenor Sans"', 'sans-serif'],
      'detail': ['Lora', 'serif']
    },
    boxShadow: {
      'button': '2px 2px 4px rgba(0, 0, 0, 0.25)'
    },
    extend: {
      colors: {
        'bg-main': '#C87A75',
        'bg-sec': '#F4F0E1',
        'bg-minor': '#F7F5F1',
        'detail-prim': '#DCC67A',
        'detail-sec': '#917108',
      },
      backgroundImage: {
        'top-border': 'url(/img/Top-border.svg)',
        'top-border-desktop': 'url(/img/border-top-desktop.svg)',
        'elephant-desktop': 'url(/img/elephant.png)',
      }
    },
  },
  plugins: [],
}
