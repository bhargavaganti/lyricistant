// tslint:disable: unified-signatures
import { PreferencesData } from './preferences/PreferencesData';

export interface RendererDelegate {
  send(
    channel: 'dark-mode-toggled',
    textSize: number | null,
    useDarkColors: boolean
  ): void;

  send(channel: 'prefs-updated', preferenceData: PreferencesData): void;
  send(channel: 'new-file-created'): void;
  send(
    channel: 'file-save-ended',
    error: Error | null,
    currentFilePath: string
  ): void;
  send(channel: 'close-prefs'): void;
  send(channel: 'find'): void;
  send(channel: 'replace'): void;
  send(channel: 'new-file'): void;
  send(
    channel: 'file-opened',
    error: Error,
    filePath: string,
    data: string
  ): void;
  send(channel: 'file-save-started', filePath: string): void;
  send(channel: 'request-editor-text'): void;
  send(channel: 'attempt-quit'): void;
  send(channel: 'undo'): void;
  send(channel: 'redo'): void;
  send(channel: 'open-prefs'): void;

  on(channel: 'ready-for-events', listener: () => void): this;
  on(channel: 'editor-text', listener: (text: string) => void): this;
  on(channel: 'prompt-save-file-for-new', listener: () => void): this;
  on(channel: 'prompt-save-file-for-quit', listener: () => void): this;
  on(channel: 'okay-for-new-file', listener: () => void): this;
  on(channel: 'okay-for-quit', listener: () => void): this;
  on(channel: 'save-prefs', listener: (data: PreferencesData) => void): this;

  removeListener(channel: 'ready-for-events', listener: () => void): this;
  removeListener(
    channel: 'editor-text',
    listener: (text: string) => void
  ): this;
  removeListener(
    channel: 'prompt-save-file-for-new',
    listener: () => void
  ): this;
  removeListener(
    channel: 'prompt-save-file-for-quit',
    listener: () => void
  ): this;
  removeListener(channel: 'okay-for-new-file', listener: () => void): this;
  removeListener(channel: 'okay-for-quit', listener: () => void): this;
  removeListener(
    channel: 'save-prefs',
    listener: (data: PreferencesData) => void
  ): this;
}

export interface PlatformDelegate {
  on(
    channel: 'dark-mode-toggled',
    listener: (textSize: number | null, useDarkColors: boolean) => void
  ): this;
  on(
    channel: 'prefs-updated',
    listener: (preferenceData: PreferencesData) => void
  ): this;
  on(
    channel: 'file-save-ended',
    listener: (error: Error | null, currentFilePath: string) => void
  ): this;
  on(channel: 'close-prefs', listener: () => void): this;
  on(channel: 'new-file-created', listener: () => void): this;
  on(channel: 'find', listener: () => void): this;
  on(channel: 'replace', listener: () => void): this;
  on(channel: 'new-file', listener: () => void): this;
  on(
    channel: 'file-opened',
    listener: (error: Error, filePath: string, data: string) => void
  ): this;
  on(channel: 'file-save-started', listener: (filePath: string) => void): this;
  on(channel: 'request-editor-text', listener: () => void): this;
  on(channel: 'attempt-quit', listener: () => void): this;
  on(channel: 'undo', listener: () => void): this;
  on(channel: 'redo', listener: () => void): this;
  on(channel: 'open-prefs', listener: () => void): this;

  removeListener(
    channel: 'dark-mode-toggled',
    listener: (textSize: number | null, useDarkColors: boolean) => void
  ): this;
  removeListener(
    channel: 'file-opened',
    listener: (error: Error, filePath: string, data: string) => void
  ): this;
  removeListener(channel: 'new-file-created', listener: () => void): this;
  removeListener(channel: 'open-prefs', listener: () => void): this;
  removeListener(
    channel: 'prefs-updated',
    listener: (preferenceData: PreferencesData) => void
  ): this;
  removeListener(channel: 'close-prefs', listener: () => void): this;
  removeListener(channel: 'new-file', listener: () => void): this;
  removeListener(
    channel: 'file-save-ended',
    listener: (error: Error | null, currentFilePath: string) => void
  ): this;
  removeListener(channel: 'attempt-quit', listener: () => void): this;
  removeListener(channel: 'request-editor-text', listener: () => void): this;
  removeListener(channel: 'undo', listener: () => void): this;
  removeListener(channel: 'redo', listener: () => void): this;
  removeListener(channel: 'find', listener: () => void): this;
  removeListener(channel: 'replace', listener: () => void): this;

  send(channel: 'ready-for-events'): void;
  send(channel: 'editor-text', text: string): void;
  send(channel: 'prompt-save-file-for-new'): void;
  send(channel: 'prompt-save-file-for-quit'): void;
  send(channel: 'okay-for-new-file'): void;
  send(channel: 'okay-for-quit'): void;
  send(channel: 'save-prefs', data?: PreferencesData): void;
}
