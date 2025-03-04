import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CMS_COMPONENT_NORMALIZER, CMS_PAGE_NORMALIZER, CmsComponentAdapter, CmsPageAdapter } from '@spartacus/core';

import { ContentfulCmsComponentAdapter } from './adapters/contentful-cms-component.adapter';
import { ContentfulCmsPageAdapter } from './adapters/contentful-cms-page.adapter';
import { ContentfulCmsBannerComponentNormalizer } from './adapters/converters/components/contentful-cms-banner-component-normalizer';
import { ContentfulCmsNavigationComponentNormalizer } from './adapters/converters/components/contentful-cms-navigation-component-normalizer';
import { ContentfulCmsProductCarouselComponentNormalizer } from './adapters/converters/components/contentful-cms-product-carousel-component-normalizer';
import { ContentfulCmsComponentNormalizer } from './adapters/converters/contentful-cms-component-normalizer';
import { ContentfulCmsPageNormalizer } from './adapters/converters/contentful-cms-page-normalizer';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: CmsPageAdapter,
      useExisting: ContentfulCmsPageAdapter,
    },
    {
      provide: CMS_PAGE_NORMALIZER,
      useExisting: ContentfulCmsPageNormalizer,
      multi: true,
    },
    {
      provide: CmsComponentAdapter,
      useExisting: ContentfulCmsComponentAdapter,
    },
    {
      provide: CMS_COMPONENT_NORMALIZER,
      useExisting: ContentfulCmsComponentNormalizer,
      multi: true,
    },
    {
      provide: CMS_COMPONENT_NORMALIZER,
      useExisting: ContentfulCmsBannerComponentNormalizer,
      multi: true,
    },
    {
      provide: CMS_COMPONENT_NORMALIZER,
      useExisting: ContentfulCmsProductCarouselComponentNormalizer,
      multi: true,
    },
    {
      provide: CMS_COMPONENT_NORMALIZER,
      useExisting: ContentfulCmsNavigationComponentNormalizer,
      multi: true,
    },
  ],
})
export class ContentfulCmsModule {}
