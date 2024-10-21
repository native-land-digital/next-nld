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
    // API rewrites
    allRewrites.push({
      source: "/api/index.php",
      destination : process.env.AWS_API_ENDPOINT,
    })
    allRewrites.push({
      source: "/wp-json/nativeland/v1/api/index.php",
      destination : process.env.AWS_API_ENDPOINT,
    })
    allRewrites.push({
      source: "/api/polygons/geojson/territories",
      destination : "https://d2u5ssx9zi93qh.cloudfront.net/territories.geojson"
    })
    allRewrites.push({
      source: "/api/polygons/geojson/languages",
      destination : "https://d2u5ssx9zi93qh.cloudfront.net/languages.geojson"
    })
    allRewrites.push({
      source: "/api/polygons/geojson/treaties",
      destination : "https://d2u5ssx9zi93qh.cloudfront.net/treaties.geojson"
    })
    allRewrites.push({
      source: "/wp-content/themes/NLD-2021/files/indigenousTerritories.json",
      destination : "https://d2u5ssx9zi93qh.cloudfront.net/territories.geojson"
    })
    allRewrites.push({
      source: "/wp-content/themes/NLD-2021/files/indigenousLanguages.json",
      destination : "https://d2u5ssx9zi93qh.cloudfront.net/languages.geojson"
    })
    allRewrites.push({
      source: "/wp-content/themes/NLD-2021/files/indigenousTreaties.json",
      destination : "https://d2u5ssx9zi93qh.cloudfront.net/treaties.geojson"
    })
    allRewrites.push({
      source: "/wp-content/themes/NLD-2021/files/indigenousTerritories",
      destination : "https://d2u5ssx9zi93qh.cloudfront.net/territories.geojson"
    })
    allRewrites.push({
      source: "/wp-content/themes/NLD-2021/files/indigenousLanguages",
      destination : "https://d2u5ssx9zi93qh.cloudfront.net/languages.geojson"
    })
    allRewrites.push({
      source: "/wp-content/themes/NLD-2021/files/indigenousTreaties",
      destination : "https://d2u5ssx9zi93qh.cloudfront.net/treaties.geojson"
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
      source: "/api/entry/searcher",
      destination : process.env.AWS_GEOCODE_ENDPOINT,
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
