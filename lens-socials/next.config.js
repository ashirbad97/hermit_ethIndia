/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "picsum.photos",
      "lens.infura-ipfs.io",
      "ipfs.io",
      "avatars.dicebear.com",
      "avatar.tobi.sh",
      "statics-mumbai-lens-staging.s3.eu-west-1.amazonaws.com",
      "cdn.stamp.fyi",
      "bafybeifiw5y4fowyuonetx3u3pufj5y46b3e5zkr4ld25u4et2n4opueni.ipfs.w3s.link",
      "pbs.twimg.com",
      "cdn.stamp.fyi",
    ],
  },
};

module.exports = nextConfig;
