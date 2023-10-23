/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        serverActions: true,
    },
    transpilePackages: ["@blueprint/ui"],
    images: {
        domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
    }
};

export default config;