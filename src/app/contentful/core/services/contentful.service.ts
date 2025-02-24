import { Injectable } from '@angular/core';

import { WindowRef } from '@spartacus/core';

import { ContentfulClientApi, createClient } from 'contentful';
import { from } from 'rxjs';

import { ContentfulCmsComponentRequest } from '../../cms/adapters/contentful-cms-component.adapter';
import { ContentfulCmsPageRequest } from '../../cms/adapters/contentful-cms-page.adapter';
import { ContentfulConfig } from '../../root/config/contentful-config';
import { defaultContentfulConfig } from '../../root/config/default-contentful-config';
import { ComponentSkeleton, PageSkeleton } from '../content-types';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly client: ContentfulClientApi<undefined>;

  constructor(
    protected config: ContentfulConfig,
    protected windowRef: WindowRef,
  ) {
    let isPreview = false;

    if (this.windowRef.isBrowser()) {
      const urlParams = new URLSearchParams(windowRef.nativeWindow?.location.search);
      isPreview = urlParams.get('preview') === 'true';
    }

    this.client = this.initializeContentfulClient(isPreview);
  }

  protected initializeContentfulClient(isPreview: boolean): ContentfulClientApi<undefined> {
    const accessToken = this.config.contentful?.accessToken ?? defaultContentfulConfig.contentful?.accessToken ?? '';
    const previewAccessToken = this.config.contentful?.previewAccessToken ?? defaultContentfulConfig.contentful?.previewAccessToken ?? '';
    const previewUrl = this.config.contentful?.previewApiUrl ?? defaultContentfulConfig.contentful?.previewApiUrl ?? '';
    const deliveryApiUrl = this.config.contentful?.deliveryApiUrl ?? defaultContentfulConfig.contentful?.deliveryApiUrl ?? '';

    return createClient({
      space: this.config.contentful?.spaceId ?? defaultContentfulConfig.contentful?.spaceId ?? '',
      environment: this.config.contentful?.environment ?? defaultContentfulConfig.contentful?.environment ?? '',
      accessToken: isPreview ? previewAccessToken : accessToken,
      host: isPreview ? previewUrl : deliveryApiUrl,
    });
  }

  getPages(req: ContentfulCmsPageRequest, locale?: string) {
    return from(this.client.getEntries<PageSkeleton>({ content_type: 'cmsPage', 'fields.slug': req.pageSlug, include: 10, locale }));
  }

  getComponents(req: ContentfulCmsComponentRequest, locale?: string) {
    return from(this.client.getEntries<ComponentSkeleton>({ 'sys.id[in]': req.componentIds, include: 10, locale }));
  }
}
