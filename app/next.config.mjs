/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isProd ? "/Classification-Cats-Dogs" : "",
  assetPrefix: isProd ? "/Classification-Cats-Dogs/" : "",
};

export default nextConfig;
