/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? "/Classification-Cats-Dogs" : "",
  assetPrefix: isProd ? "/Classification-Cats-Dogs/" : "",
};

export default nextConfig;
