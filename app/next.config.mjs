/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? process.env.REACT_APP_BASE_URL : "",
  assetPrefix: isProd ? process.env.REACT_APP_BASE_URL : "",
};

export default nextConfig;
