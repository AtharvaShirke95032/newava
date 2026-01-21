/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    unoptimized: true, // Leaflet tiles need this
  },
};

export default nextConfig;
