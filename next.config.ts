import type { NextConfig } from "next";

const API_GATEWAY = process.env.BACKEND_URL || "https://api-pizza.adityavyas.com"

const nextConfig: NextConfig = {
    output: "standalone",
    // Cache Components (PPR): static shell prerendered at build time,
    // runtime reads (searchParams/cookies) stream behind <Suspense>.
    cacheComponents: true,
     images: {
        // Product/topping images live on S3 under IMMUTABLE keys (every upload
        // gets a fresh UUID and the previous object is deleted), so optimized
        // URLs are stable forever - safe to let browsers cache them for a year.
        // This turns the first modal open into the only full fetch; every
        // later open is served straight from the browser cache.
        minimumCacheTTL: 31536000,
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
