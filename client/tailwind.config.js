module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        85: "89vh",
        15: "11vh",
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#111827",
      secondary: "#272011",
      danger: "#e3342f",
    }),
  },
  plugins: [],
};
