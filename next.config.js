const isProd = process.env.NODE_ENV === 'production';


const nextConfig = {
  productionBrowserSourceMaps: false,
  // basePath: isProd ? '/DSA_Tracker_Frontend' : '',
  // assetPrefix: isProd ? '/DSA_Tracker_Frontend/' : '',
  trailingSlash: true,
  // output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,  // Fixes image loading issues in static exports
  },
};
export default nextConfig;
