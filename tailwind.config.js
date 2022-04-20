module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // container: {
      //   center: true,
      // },
      colors: {
        abu: "#8B8B8B",
        abuContainer: "#bdbab5",
        hijauMuda: "#1db954",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
