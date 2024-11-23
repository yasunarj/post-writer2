import { withContentlayer } from "next-contentlayer";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    metadataBase: new URL("https://your-domain.com"), // 本番環境のURLを設定します
  },
  /* config options here */
};


export default withContentlayer(nextConfig);
