import { Injectable } from '@angular/core';

import { CmsComponent, CmsProductCarouselComponent, Converter } from '@spartacus/core';

import { Entry } from 'contentful';

import { ComponentSkeleton } from '../../../../core/content-types';
import { isString } from '../../../../core/type-guards';

@Injectable({ providedIn: 'root' })
export class ContentfulCmsProductCarouselComponentNormalizer implements Converter<Entry<ComponentSkeleton, undefined, string>, CmsComponent> {
  constructor() {}

  convert(source: Entry<ComponentSkeleton, undefined, string>, target: CmsComponent): CmsComponent {
    if (source.sys.contentType.sys.id === 'ProductCarouselComponent') {
      this.normalizeProductCodes(source, target);
    }

    return target;
  }

  private normalizeProductCodes(source: Entry<ComponentSkeleton, undefined, string>, component: CmsProductCarouselComponent): void {
    if (Array.isArray(source.fields['products'])) {
      component.productCodes = source.fields['products']
        .map((productUrl) => (isString(productUrl) ? productUrl.split('/').pop() : ''))
        .filter(Boolean)
        .join(' ');
    }
  }
}
