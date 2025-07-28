import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/JorgeB-py/assets-hypertrophic/**",
      },
    ],
    unoptimized: false,
  },
};


export default nextConfig;
