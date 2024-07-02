/** @type {import('next').NextConfig} */
// Path: next.config.js
const nextConfig = {
    webpack: config => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding')
      return config
    },
    images:{
      remotePatterns:[{hostname:"*.stockx.com"}]
    }
  }
export default nextConfig;
