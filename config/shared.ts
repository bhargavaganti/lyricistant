import CircularDependencyPlugin from 'circular-dependency-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import DelegatesWebpackPlugin from './plugins/DelegatesWebpackPlugin';

export const DelegatesPlugin = new DelegatesWebpackPlugin();

export const projectDir = path.resolve(__dirname, '../');

export const resolve = (...pathSegments: string[]) => {
  return path.resolve(projectDir, ...pathSegments);
};

export const aliases = (platformName: string): { [key: string]: string } => {
  return {
    common: path.resolve(projectDir, 'src/common/'),
    PlatformDelegate$: path.resolve(
      projectDir,
      `src/${platformName}/Delegates.ts`
    ),
    Components$: path.resolve(projectDir, `src/${platformName}/Components.ts`),
  };
};

export const HtmlPlugin = new HtmlWebpackPlugin({
  title: 'Untitled',
  template: resolve('src/renderer/index.html'),
});

export const StaticAssetsPlugin = new CopyWebpackPlugin({
  patterns: [{ from: 'src/renderer/static' }],
});

export const CircularDepsPlugin = new CircularDependencyPlugin({
  allowAsyncCycles: true,
  exclude: /node_modules/,
  failOnError: true,
});
