import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CMS_COMPONENT_NORMALIZER, CMS_PAGE_NORMALIZER, CmsComponentAdapter, CmsPageAdapter } from '@spartacus/core';

import { ContentfulCmsComponentAdapter } from './adapters/contentful-cms-component.adapter';
import { ContentfulCmsPageAdapter } from './adapters/contentful-cms-page.adapter';
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
  ],
})
export class ContentfulCmsModule {}
