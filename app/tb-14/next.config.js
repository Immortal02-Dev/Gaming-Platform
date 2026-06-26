const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "p.staticube.com",
      },
      {
        protocol: "https",
        hostname: "solawins-sg0.pragmaticplay.net",
      },
      {
        protocol: "https",
        hostname: "img.gameimgdata.net",
      },
    ],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

module.exports = nextConfig;
