import type { NextConfig } from "next";

const API_GATEWAY = process.env.BACKEND_URL || "https://api-pizza.adityavyas.com"

const nextConfig: NextConfig = {
    output: "standalone",
     images: {
        // S3 images are currently served under MUTABLE keys (the same URL is
        // overwritten when a product image is updated), so we keep a moderate
        // TTL: the image optimizer re-fetches from S3 at most this often and
        // browsers cache the optimized result for the same period.
        // Once the backend switches to immutable, content-hashed S3 keys,
        // raise this to 31536000 (1 year) for fully CDN-like behavior.
        minimumCacheTTL: 3600,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "mernspace-backend-project.s3.us-east-1.amazonaws.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
    async rewrites() {
        return[
            {
                source: "/api/order/:patch*",
                destination: `${API_GATEWAY}/api/order/:patch*`
            },
            {
                source: "/api/catalog/:patch*",
                destination: `${API_GATEWAY}/api/catalog/:patch*`
            }
        ]
    },
};

export default nextConfig;
