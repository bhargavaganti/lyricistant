#!/usr/bin/env ts-node-script -r tsconfig-paths/register

import prettier from 'prettier';

interface ChannelInfo {
  channel: string;

  [key: string]: string;
}

const createImportStatement = ([importName, importLocation]: any[]) =>
  `import {${importName}} from '${importLocation}';\n`;

function createFunctions(channelInfo: ChannelInfo) {
  const { on, remove } = createOnAndRemoveListeners(channelInfo);
  return {
    send: createSendFunction(channelInfo),
    on,
    remove,
  };
}

function createSendFunction({ channel, ...args }: ChannelInfo): string {
  const [openSend, closeSend] = [`send(channel: '${channel}'`, `): void;\n`];
  let extraParams = '';

  if (Object.keys(args).length) {
    const params = Object.entries(args)
      .map(([param, type]) => `${param}: ${type}`)
      .join(', ');

    extraParams = `,${params}`;
  }

  return openSend + extraParams + closeSend;
}

function createOnAndRemoveListeners({ channel, ...args }: ChannelInfo) {
  const [openOn, closeOn] = [
    `on(channel: '${channel}', listener: (`,
    `) => void): this;\n`,
  ];

  const [openRemove, closeRemove] = [
    `removeListener(channel: '${channel}', listener: (`,
    `) => void): this;\n`,
  ];

  let listeners = '';

  if (Object.keys(args).length) {
    listeners = Object.entries(args)
      .map(([param, type]) => `${param}: ${type}`)
      .join(', ');
  }

  return {
    on: openOn + listeners + closeOn,
    remove: openRemove + listeners + closeRemove,
  };
}

export const createDelegates = (): string => {
  const {
    imports,
    platformChannels,
    rendererChannels,
  } = require('../../outlines/Delegates.json');

  const rendererFunctions = rendererChannels.map(createFunctions);
  const platformFunctions = platformChannels.map(createFunctions);

  const options = prettier.resolveConfig.sync(process.cwd());

  return prettier.format(
    `
    /* This file is automatically generated from Delegates.json */
    // tslint:disable: unified-signatures adjacent-overload-signatures
    ${Object.entries(imports).map(createImportStatement).join('')}

    /**
    * Used by the platform to communicate with the renderer.
    */
    export interface RendererDelegate {
    ${rendererFunctions.map((it: any) => it.send).join('')}
    ${platformFunctions.map((it: any) => it.on + it.remove + '\n').join('')}
    }
    /**
    * Used by the renderer to communicate with the platform.
    */
    export interface PlatformDelegate {
    ${platformFunctions.map((it: any) => it.send).join('')}
    ${rendererFunctions.map((it: any) => it.on + it.remove + '\n').join('')}
    }
`,
    {
      parser: 'typescript',
      ...options,
    }
  );
};
