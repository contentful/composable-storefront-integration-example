import { Injectable } from '@angular/core';

import { CmsComponent, Converter } from '@spartacus/core';

import { Entry } from 'contentful';

import { ComponentSkeleton } from '../../../core/content-types';
import { normalizeMedia, normalizeNavigationNode, normalizeProductCodes } from './contentful-cms-normalizers';

@Injectable({ providedIn: 'root' })
export class ContentfulCmsComponentNormalizer implements Converter<Entry<ComponentSkeleton, undefined, string>, CmsComponent> {
  convert(source: Entry<ComponentSkeleton, undefined, string>, target: CmsComponent = {}): CmsComponent {
    target = {
      ...target,
      ...source.fields,
      uid: source.sys.id,
      typeCode: source.sys.contentType.sys.id,
    };

    normalizeNavigationNode(source, target);
    normalizeMedia(source, target);
    normalizeProductCodes(source, target);
    return target;
  }
}
