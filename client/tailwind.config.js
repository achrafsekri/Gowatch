module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'pm': '15px 15px 30px #191919,-15px -15px 30px #292929',
      },
      height: {
        85: "89vh",
        15: "11vh",
      },
      colors: {
        primary:"#C84B31"
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      background_am: "rgb(17 24 39)",
      background_pm: "#212121",
      secondary: "#C84B31",
      danger: "#B20600",
    }),
  },
  plugins: [],
};
