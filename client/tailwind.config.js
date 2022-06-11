module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'pm': '15px 15px 30px #191919,-15px -15px 30px #292929',
        'am': '15px 15px 30px #bebebe,-15px -15px 30px #ffffff'
      },
      height: {
        85: "89vh",
        15: "11vh",
      },
      width:{mx:'1536px'},
      colors: {
        primary:"#C84B31"
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      background_am: "#e0e0e0",
      background_pm: "#212121",
      secondary: "#C84B31",
      danger: "#B20600",
    }),
  },
  plugins: [],
};
