const withFonts = require("nextjs-fonts");

module.exports = withFonts({
  webpack(config) {
    return config;
  },
});
