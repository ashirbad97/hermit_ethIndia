/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["picsum.photos", "lens.infura-ipfs.io", "ipfs.io"],
  },
};

module.exports = nextConfig;
