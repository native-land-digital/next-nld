/** @type {import('next').NextConfig} */
import { availableLocales, rootDirectories } from './src/i18n/config.js';
import createMDX from '@next/mdx';

const withMDX = createMDX();

const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  rewrites: () => {
    // This rewrites any sub-pages to point to the /en version that actually exists
    let allRewrites = rootDirectories.map(directory => {
      return {
        source: `/${directory}/:path*`,
        destination : `/en/${directory}/:path*`,
      }
    })
    // This makes sure the root homepage renders the /en version by default
    allRewrites.push({
      source: "/",
      destination : "/en",
    })
    return allRewrites
  },
  redirects: () => {
    let allRedirects = [{
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
      source: "/category/community-blog",
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
      destination : process.env.AWS_API_ENDPOINT,
      permanent: true
    },{
      source: "/api/index.php",
      destination : process.env.AWS_API_ENDPOINT,
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
    },{
      source: "/maps-old/:path*",
      destination : "/maps/:path*",
      permanent: true
    },{
      source: "/mobile-app",
      destination : "/resources/mobile-apps",
      permanent: true
    }]
    // This ensures that any internationalized path with at least one sub-path redirects to the /en version (avoiding page generation for non-translated pages)
    // There's a way to regex it, but I got tired of it
    const modifiedLocales = availableLocales.slice(1);
    modifiedLocales.forEach(locale => {
      allRedirects.push({
        source: `/${locale}/:path+`,
        destination: "/:path+",
        permanent: true
      })
    })
    return allRedirects;
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
};

export default withMDX(nextConfig);
