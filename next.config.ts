import type { NextConfig } from "next";

const API_GATEWAY = process.env.BACKEND_URL || "https://api-pizza.adityavyas.com"

const nextConfig: NextConfig = {
    output: "standalone",
     images: {
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
