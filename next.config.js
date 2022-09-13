/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'k.kakaocdn.net', 'ssl.pstatic.net'],
  },
}

module.exports = nextConfig
