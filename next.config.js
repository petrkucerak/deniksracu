const withPWA = require("next-pwa");
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  trailingSlash: true,
  pwa: {
    dest: "public",
    // cacheOnFrontEndNav: true, // make all page linked form index cached
    disable: process.env.NODE_ENV === "development",
    register: false,
    runtimeCaching,
  },
});