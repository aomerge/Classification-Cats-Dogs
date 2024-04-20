/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isProd ? "/Zainab-Porfolio" : "",
  assetPrefix: isProd ? "/Zainab-Porfolio/" : "",
};

export default nextConfig;
