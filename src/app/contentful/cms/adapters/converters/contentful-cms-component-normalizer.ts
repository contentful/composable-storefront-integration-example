import { Injectable } from '@angular/core';

import { CmsComponent, Converter } from '@spartacus/core';

import { Entry } from 'contentful';

import { ComponentSkeleton } from '../../../core/content-types';
import { RestrictionsService } from '../../../core/services/contentful-restrictions.service';

@Injectable({ providedIn: 'root' })
export class ContentfulCmsComponentNormalizer implements Converter<Entry<ComponentSkeleton, undefined, string>, CmsComponent> {
  constructor(private readonly restrictionsService: RestrictionsService) {}

  convert(source: Entry<ComponentSkeleton, undefined, string>, target: CmsComponent): CmsComponent {
    if (!this.restrictionsService.isEntryAccessible(source)) {
      return {
        uid: source.sys.id,
      };
    }

    target = {
      ...target,
      ...source.fields,
      uid: source.sys.id,
      typeCode: source.sys.contentType.sys.id,
    };

    return target;
  }
}
