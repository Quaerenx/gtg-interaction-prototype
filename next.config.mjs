import process from "node:process";

/** @type {import('next').NextConfig} */
function normalizeBasePath(value) {
  const normalized = value.trim().replace(/^\/+|\/+$/g, "");
  return normalized ? `/${normalized}` : "";
}

const basePath = normalizeBasePath(process.env.NEXT_BASE_PATH ?? "/hero");

const nextConfig = {
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    path: `${basePath}/_next/image`
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  allowedDevOrigins: ["192.168.40.18", "127.0.0.1", "localhost"]
};

export default nextConfig;
