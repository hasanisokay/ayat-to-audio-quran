/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Add the file-loader rule for handling .ttf files
        config.module.rules.push({
          test: /\.(woff|woff2|eot|ttf|otf)$/,
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
