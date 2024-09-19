/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  i18n: {
    locales : ['en-US', 'fr', 'es'],
    defaultLocale : 'en-US'
  }
};

export default nextConfig;
