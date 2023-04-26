/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.sdn.cz",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
