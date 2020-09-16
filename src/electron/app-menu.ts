import Platform = NodeJS.Platform;
import { MenuItemConstructorOptions } from 'electron';

export interface MenuItemHandlers {
  onNewClicked: () => void;
  onOpenClicked: () => void;
  onOpenRecentClicked: (filePath: string) => void;
  onSaveClicked: () => void;
  onSaveAsClicked: () => void;
  onPreferencesClicked: () => void;
  onUndoClicked: () => void;
  onRedoClicked: () => void;
  onFindClicked: () => void;
  onReplaceClicked: () => void;
  onQuitClicked: () => void;
}

export const createAppMenu = (
  appName: string,
  platform: Platform,
  handlers: MenuItemHandlers,
  recentFiles?: string[]
): MenuItemConstructorOptions[] => {
  const isMac = platform === 'darwin';
  const menuTemplate: MenuItemConstructorOptions[] = [
    createFileMenu(handlers, !isMac, !isMac, recentFiles),
    createEditMenu(handlers),
    {
      role: 'window',
      submenu: [{ role: 'minimize' }]
    }
  ];

  if (isMac) {
    menuTemplate.unshift(createMacMenu(appName, handlers));
  }

  return menuTemplate;
};

const createFileMenu = (
  handlers: MenuItemHandlers,
  showPrefs: boolean,
  showQuit: boolean,
  recentFiles?: string[]
): MenuItemConstructorOptions => {
  const prefsSection: MenuItemConstructorOptions[] = showPrefs
    ? [
        { type: 'separator' },
        {
          label: 'Preferences',
          click: handlers.onPreferencesClicked
        }
      ]
    : [];

  const quitSection: MenuItemConstructorOptions[] = showQuit
    ? [
        { type: 'separator' },
        {
          label: 'Quit',
          click: handlers.onQuitClicked,
          accelerator: 'Alt+F4'
        }
      ]
    : [];
  return {
    label: 'File',
    submenu: [
      {
        label: 'New',
        click: handlers.onNewClicked,
        accelerator: 'CmdOrCtrl+N'
      },
      { type: 'separator' },
      {
        label: 'Open...',
        click: handlers.onOpenClicked,
        accelerator: 'CmdOrCtrl+O'
      },
      {
        label: 'Open Recent',
        submenu: createRecentFilesSubmenu(handlers, recentFiles)
      },
      { type: 'separator' },
      {
        label: 'Save',
        click: handlers.onSaveClicked,
        accelerator: 'CmdOrCtrl+S'
      },
      {
        label: 'Save As...',
        click: handlers.onSaveAsClicked,
        accelerator: 'Shift+CmdOrCtrl+S'
      },
      ...prefsSection,
      ...quitSection
    ]
  };
};

const createEditMenu = (
  handlers: MenuItemHandlers
): MenuItemConstructorOptions => {
  return {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        click: handlers.onUndoClicked,
        accelerator: 'CmdOrCtrl+Z'
      },
      {
        label: 'Redo',
        click: handlers.onRedoClicked,
        accelerator: 'Shift+CmdOrCtrl+Z'
      },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { type: 'separator' },
      {
        label: 'Find',
        accelerator: 'CmdOrCtrl+F',
        click: handlers.onFindClicked
      },
      {
        label: 'Replace',
        accelerator: 'CmdOrCtrl+R',
        click: handlers.onReplaceClicked
      }
    ]
  };
};

const createRecentFilesSubmenu = (
  handlers: MenuItemHandlers,
  recentFiles?: string[]
): MenuItemConstructorOptions[] => {
  if (!recentFiles) {
    return [
      {
        label: '<No recent files>',
        enabled: false
      }
    ];
  }
  return recentFiles.map((filePath: string) => {
    return {
      label: filePath,
      click: () => handlers.onOpenRecentClicked(filePath)
    };
  });
};

const createMacMenu = (
  appName: string,
  handlers: MenuItemHandlers
): MenuItemConstructorOptions => {
  return {
    label: appName,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      {
        label: 'Preferences',
        click: handlers.onPreferencesClicked
      },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      {
        label: 'Quit',
        click: handlers.onQuitClicked,
        accelerator: 'Cmd+Q'
      }
    ]
  };
};
