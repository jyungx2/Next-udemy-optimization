/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚨 런타임에러 (hostname "res.cloudinary.com" is not configured under images in your `next.config.js`)에 대한 해결책
  images: {
    remotePatterns: [{ hostname: "res.cloudinary.com" }],
  },
};

export default nextConfig;
