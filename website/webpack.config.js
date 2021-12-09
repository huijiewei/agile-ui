const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');

module.exports = (env, argv) => {
  process.env.NODE_ENV = argv.mode;

  const isProduction = argv.mode === 'production';

  const fileName = `assets/js/${isProduction ? '[name].[contenthash:8].js' : '[name].js'}`;
  const cssFileName = `assets/css/${isProduction ? '[name].[contenthash:8].css' : '[name].css'}`;
  const assetsFileName = isProduction ? '[contenthash:8][ext]' : '[name][ext]';

  return {
    entry: {
      website: './src/main.tsx',
    },
    cache: {
      type: 'filesystem',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    output: {
      filename: fileName,
      chunkFilename: fileName,
      assetModuleFilename: `assets/resource/${assetsFileName}`,
      pathinfo: false,
      clean: isProduction,
    },
    devServer: {
      headers: { 'Access-Control-Allow-Origin': '*' },
      historyApiFallback: true,
      port: 8010,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [!isProduction && require.resolve('react-refresh/babel')].filter(Boolean),
              },
            },
          ],
        },
        {
          test: /\.mdx?$/,
          use: [
            {
              loader: '@mdx-js/loader',
              options: {},
            },
          ],
        },
        {
          test: /\.vanilla\.css$/i,
          use: [
            {
              loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset',
          generator: {
            filename: `assets/images/${assetsFileName}`,
          },
          parser: {
            dataUrlCondition: {
              maxSize: 256,
            },
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
          type: 'asset/resource',
          generator: {
            filename: `assets/medias/${assetsFileName}`,
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset',
          generator: {
            filename: `assets/fonts/${assetsFileName}`,
          },
          parser: {
            dataUrlCondition: {
              maxSize: 256,
            },
          },
        },
      ],
    },
    plugins: [
      new VanillaExtractPlugin({ identifiers: 'short' }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: cssFileName,
          chunkFilename: cssFileName,
        }),
      !isProduction &&
        new ReactRefreshWebpackPlugin({
          overlay: {
            sockProtocol: 'ws',
          },
        }),
      new HtmlWebpackPlugin({
        title: 'Agile UI',
        template: './public/index.html',
        minify: isProduction
          ? {
              collapseWhitespace: true,
              keepClosingSlash: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
              minifyCSS: true,
            }
          : false,
      }),
      isProduction &&
        env['BUNDLE_ANALYZE'] === '1' &&
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
        }),
    ].filter(Boolean),
    optimization: isProduction
      ? {
          minimizer: [new CssMinimizerPlugin(), '...'],
          splitChunks: {
            cacheGroups: {
              react: {
                name: 'react',
                test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|history|scheduler)[\\/]/,
                chunks: 'all',
                priority: 30,
                enforce: true,
              },
              agile: {
                name: 'agile',
                test: /[\\/]node_modules[\\/](@agile-ui)[\\/]/,
                chunks: 'all',
                priority: 25,
                enforce: true,
              },
              vendor: {
                name: 'vendor',
                test: /[\\/]node_modules[\\/]/,
                chunks: 'all',
                priority: 10,
                enforce: true,
              },
            },
          },
        }
      : {
          runtimeChunk: 'single',
        },
    devtool: isProduction ? false : 'eval-cheap-module-source-map',
  };
};
