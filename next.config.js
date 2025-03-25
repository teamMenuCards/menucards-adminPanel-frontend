/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com', // Add other domains you need here
      // Add other image hosts if needed:
      // 'your-other-image-domain.com',
      // 'firebasestorage.googleapis.com',
      // 's3.amazonaws.com'
    ],
  },
};

module.exports = nextConfig;
