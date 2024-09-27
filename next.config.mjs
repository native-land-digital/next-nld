/** @type {import('next').NextConfig} */
import json5 from 'json5';

const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  redirects: () => {
    return [{
      source: "/about",
      destination: "/about/our-team",
      permanent: true
    },{
      source: "/media",
      destination: "/media/media-coverage",
      permanent: true
    },{
      source: "/how-to-contribute",
      destination: "/how-to-contribute/volunteer",
      permanent: true
    },{
      source: "/resources",
      destination: "/resources/teachers-guide",
      permanent: true
    }]
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.json5$/,
      type: "json",
      parser: {
        parse: json5.parse
      }
    });
    return config;
  },
};

export default nextConfig;
