/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'upload.wikimedia.org',
      },
      {
        protocol:'https',
        hostname:'download.blender.org'
      },
      {
        protocol:'http',
        hostname:'uhdtv.io'
      },
      {
        protocol:'https',
        hostname:'mango.blender.org'
      }
    ]
  }
}

module.exports = nextConfig
