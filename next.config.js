/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
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
