const basePage = "/lava-lamp";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true,
  // },
  transpilePackages: ["@react-three/postprocessing"],
  // basePath: basePage,
  redirects: async () => {
    return [{
      source: "/",
      destination: basePage,
      permanent: false,
    }]
  },
  webpack: (config) => {
		config.module.rules.push({
			test: /\.glsl$/,
			loader: "webpack-glsl-loader",
		});
		return config;
	},
}

module.exports = nextConfig
