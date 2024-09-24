/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
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
  }
};

export default nextConfig;
