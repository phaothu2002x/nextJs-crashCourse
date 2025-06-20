import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    typescript: {
        // Set to false to allow production builds with type errors
        ignoreBuildErrors: true,
    },
    eslint: {
        // Set to false to allow production builds with lint errors
        ignoreDuringBuilds: true,
    },
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [{ protocol: 'https', hostname: '*' }],
    },
    // experimental: {
    //     // ppr: 'incremental',
    //     after: true,
    // },
};

export default nextConfig;
