module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
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
