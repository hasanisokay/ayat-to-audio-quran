/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Add the file-loader rule for handling .ttf files
        config.module.rules.push({
          test: /\.(ttf|otf)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                publicPath: '/_next/static/fonts/',
                outputPath: `${isServer ? '../' : ''}static/fonts/`,
              },
            },
          ],
        });
    
        return config;
      },
};

export default nextConfig;
