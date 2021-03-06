import { DIContainer } from '@wessberg/di';
import type { RendererDelegate } from 'common/Delegates';
import type { Dialogs } from 'common/dialogs/Dialogs';
import type { FileManager } from 'common/files/FileManager';
import type { Files } from 'common/files/Files';
import type { RecentFiles } from 'common/files/RecentFiles';
import type { Managers } from 'common/Managers';
import type { PreferenceManager } from 'common/preferences/PreferenceManager';
import type { Preferences } from 'common/preferences/Preferences';
import type { SystemThemeProvider } from 'common/theme/SystemTheme';
import type { TitleFormatter, UiConfigProvider } from 'common/ui/UiConfig';
import type { UiConfigManager } from 'common/ui/UiConfigManager';
import { ipcMain } from 'electron';
import { ElectronRendererDelegate } from './Delegates';
import { mainWindow } from './index';
import type { ElectronDialogs } from './platform/Dialogs';
import type { ElectronFiles } from './platform/Files';
import type { ElectronLogger } from './platform/Logger';
import type { ElectronPreferences } from './platform/Preferences';
import type { QuitManager } from './platform/QuitManager';
import type { ElectronRecentFiles } from './platform/RecentFiles';
import type { ElectronSystemThemeProvider } from './platform/SystemThemeProvider';
import { formatTitle, provideUiConfig } from './platform/UiConfigProvider';

export const initializeComponent = (component: DIContainer) => {
  component.registerTransient<RendererDelegate>(() => {
    if (!mainWindow) {
      throw Error(
        'Tried to initialize an ElectronRendererDelegate with no mainWindow!'
      );
    }
    return new ElectronRendererDelegate(ipcMain, mainWindow);
  });

  component.registerSingleton<Dialogs, ElectronDialogs>();
  component.registerSingleton<Files, ElectronFiles>();
  component.registerSingleton<Logger, ElectronLogger>();
  component.registerSingleton<Preferences, ElectronPreferences>();
  component.registerSingleton<RecentFiles, ElectronRecentFiles>();
  component.registerSingleton<
    SystemThemeProvider,
    ElectronSystemThemeProvider
  >();
  component.registerSingleton<UiConfigProvider>(() => provideUiConfig);
  component.registerSingleton<TitleFormatter>(() => formatTitle);

  component.registerSingleton<FileManager>();
  component.registerSingleton<PreferenceManager>();
  component.registerSingleton<UiConfigManager>();
  component.registerSingleton<QuitManager>();

  component.registerTransient<Managers>(() => [
    component.get<FileManager>(),
    component.get<PreferenceManager>(),
    component.get<UiConfigManager>(),
    component.get<QuitManager>(),
  ]);
};
