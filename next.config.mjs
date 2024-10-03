/** @type {import('next').NextConfig} */
import json5 from 'json5';
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx'

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX();

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
      source: "/category/community-blog/",
      destination: "https://medium.com/@native-land",
      permanent: true
    },{
      source: "/resources/api-docs",
      destination: "https://api-docs.native-land.ca",
      permanent: true
    },{
      source: "/resources",
      destination: "/resources/teachers-guide",
      permanent: true
    },{
      source: "/languages",
      destination: "/resources/translations",
      permanent: true
    },{
      source: "/resources/territories-list",
      destination: "/maps/territories",
      permanent: true
    },{
      source: "/resources/languages-list",
      destination: "/maps/languages",
      permanent: true
    },{
      source: "/resources/treaties-list",
      destination: "/maps/treaties",
      permanent: true
    },{
      source: "/wp-json/nativeland/v1/api/index.php",
      destination : "/api/index.php",
      permanent: true
    },{
      source: "/wp-content/themes/NLD-2021/files/indigenousTerritories.json",
      destination : "/api/polygons/geojson/territories",
      permanent: true
    },{
      source: "/wp-content/themes/NLD-2021/files/indigenousLanguages.json",
      destination : "/api/polygons/geojson/languages",
      permanent: true
    },{
      source: "/wp-content/themes/NLD-2021/files/indigenousTreaties.json",
      destination : "/api/polygons/geojson/treaties",
      permanent: true
    },{
      source: "/wp-json/nativeland/v1/coordinates/indigenousTerritories",
      destination : "/api/polygons/geojson/territories",
      permanent: true
    },{
      source: "/wp-json/nativeland/v1/coordinates/indigenousLanguages",
      destination : "/api/polygons/geojson/languages",
      permanent: true
    },{
      source: "/wp-json/nativeland/v1/coordinates/indigenousTreaties",
      destination : "/api/polygons/geojson/treaties",
      permanent: true
    }]
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
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
  experimental: {
    mdxRs: true,
  },
};

export default withNextIntl(withMDX(nextConfig));
