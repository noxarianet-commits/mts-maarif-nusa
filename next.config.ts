import type { NextConfig } from "next";

images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
    },
  ],
  },

export default nextConfig;
