import { Injectable } from '@angular/core';

import { LoggerService, WindowRef } from '@spartacus/core';

import { map } from 'rxjs/operators';

import { ContentfulClientApi, Entry, createClient } from 'contentful';
import { Observable, from, of } from 'rxjs';

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
    protected logger: LoggerService,
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

  private transformSlug(slug: string): string {
    const slugMapping = this.config.contentful?.slugMapping ?? {};
    for (const pattern in slugMapping) {
      const regex = new RegExp(pattern);
      if (regex.test(slug)) {
        return slugMapping[pattern];
      }
    }
    return slug;
  }

  getPage(req: ContentfulCmsPageRequest, locale?: string): Observable<Entry<PageSkeleton, undefined, string> | null> {
    if (!req.pageSlug) {
      this.logger.warn(`WARNING: Page slug is empty. Cannot fetch page.`);
      return of(null);
    }

    const slug = this.transformSlug(req.pageSlug);

    return from(this.client.getEntries<PageSkeleton>({ content_type: 'cmsPage', 'fields.slug': slug, include: 10, locale })).pipe(
      map((pages) => {
        if (pages.total === 0) {
          this.logger.warn(`WARNING: No page found for slug "${slug}".`);
          return null;
        }

        return pages.items[0];
      }),
    );
  }

  getComponents(req: ContentfulCmsComponentRequest, locale?: string) {
    return from(this.client.getEntries<ComponentSkeleton>({ 'sys.id[in]': req.componentIds, include: 10, locale }));
  }
}
