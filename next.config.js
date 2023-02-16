/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'k.kakaocdn.net', 'ssl.pstatic.net', 'firebasestorage.googleapis.com'],
  },
  compiler: {
    // ssr, displayName true는 기본값
    styledComponents: true
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextConfig
