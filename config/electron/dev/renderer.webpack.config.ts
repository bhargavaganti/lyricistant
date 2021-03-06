import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { di } from '@wessberg/di-compiler';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { Program } from 'typescript';
import { Configuration } from 'webpack';
import {
  aliases,
  CircularDepsPlugin,
  HtmlPlugin,
  RendererGlobalsPlugin,
  resolve,
  StaticAssetsPlugin,
} from '../../shared';

export const devServerPort = 9080;

const config: Configuration = {
  mode: 'development',
  target: 'electron-renderer',
  entry: './src/renderer/index.tsx',
  devtool: 'eval-source-map',
  resolve: {
    alias: aliases('electron'),
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: ['node_modules'],
  },
  plugins: [
    HtmlPlugin,
    new CleanWebpackPlugin({
      verbose: true,
    }),
    CircularDepsPlugin,
    StaticAssetsPlugin,
    new ReactRefreshWebpackPlugin(),
    RendererGlobalsPlugin,
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [resolve('src/')],
        exclude: [resolve('src/web')],
        loader: 'ts-loader',
        options: {
          getCustomTransformers: (program: Program) => di({ program }),
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(woff|woff2|eot|ttf|svg|png)$/,
        loader: 'file-loader',
      },
    ],
  },
  output: {
    path: resolve('dist/electron/renderer'),
    filename: 'renderer.js',
  },
  devServer: {
    host: 'localhost',
    port: devServerPort,
    hot: true,
    overlay: true,
  },
};

export default config;
