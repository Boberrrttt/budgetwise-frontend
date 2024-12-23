/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: [
        'scontent.fcgy3-1.fna.fbcdn.net',
        'scontent.fceb1-2.fna.fbcdn.net',
        'scontent.fcgy2-2.fna.fbcdn.net',
        'scontent.fcgy2-1.fna.fbcdn.net',
        'scontent.fcgy2-4.fna.fbcdn.net'
      ],  
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'], // This allows importing SVGs as React components
    });

    return config;
  },
};

export default nextConfig;