import { Injectable } from '@angular/core';
import { ContentfulLivePreview, ContentfulLivePreviewInitConfig, LivePreviewProps } from '@contentful/live-preview';
import { Argument, SubscribeCallback } from '@contentful/live-preview/dist/types';

interface Options {
  locale?: string;
  skip?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ContentfulAngularService {
  private config: ContentfulLivePreviewInitConfig = { locale: '' };

  init({
    locale,
    space,
    environment,
    debugMode = false,
    enableInspectorMode = true,
    enableLiveUpdates = true,
    targetOrigin,
    experimental,
  }: ContentfulLivePreviewInitConfig): void {
    ContentfulLivePreview.init({
      locale,
      space,
      environment,
      debugMode,
      enableInspectorMode,
      enableLiveUpdates,
      targetOrigin,
      experimental,
    });

    this.config = {
      locale,
      space,
      environment,
      debugMode,
      enableInspectorMode,
      enableLiveUpdates,
      targetOrigin,
    };
  }

  getInspectorModeTags(config: LivePreviewProps) {
    if (this.config.enableInspectorMode) {
      return ContentfulLivePreview.getProps(config);
    }

    return null;
  }

  private shouldSubscribe<T extends Argument>(data: T): boolean {
    if (!this.config.enableLiveUpdates) {
      return false;
    }

    if (Array.isArray(data) && data.length) {
      return true;
    }

    return !!(data && typeof data === 'object' && Object.keys(data).length);
  }

  activateLiveUpdates<T extends Argument>(data: T, callback: SubscribeCallback, optionsOrLocale?: Options | string) {
    const options = typeof optionsOrLocale === 'object' ? optionsOrLocale : { locale: optionsOrLocale };

    if (this.shouldSubscribe(data)) {
      return ContentfulLivePreview.subscribe('edit', {
        data: data,
        locale: options.locale,
        callback,
      });
    }
    return undefined;
  }
}
