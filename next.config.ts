import type { NextConfig } from "next";

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
};

export default nextConfig;
