/** @type {import('next').NextConfig} */

import { env } from 'process';

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  env:{
    REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL,
  },
  basePath: isProd ? process.env.REACT_APP_BASE_URL : "",
  assetPrefix: isProd ? process.env.REACT_APP_BASE_URL : "",
};

export default nextConfig;
