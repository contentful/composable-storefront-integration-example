import { TestBed } from '@angular/core/testing';

import { CmsBannerComponent, CmsComponent } from '@spartacus/core';

import { Entry } from 'contentful';

import { ComponentSkeleton } from '../../../core/content-types';
import { DeepPartial } from '../../../core/helpers';
import { RestrictionsService } from '../../../core/services/contentful-restrictions.service';
import { ContentfulCmsComponentNormalizer } from './contentful-cms-component-normalizer';

const mockComponent: DeepPartial<Entry<ComponentSkeleton, undefined, string>> = {
  'sys': {
    'id': 'entryId',
    'type': 'Entry',
    'contentType': {
      'sys': {
        'type': 'Link',
        'linkType': 'ContentType',
        'id': 'SimpleResponsiveBannerComponent',
      },
    },
  },
  'fields': {
    'urlLink': '/Open-Catalogue/Tools/c/1355',
    'name': 'Powertools Hompage Splash Banner Component',
  },
};

describe('ContentfulCmsComponentNormalizer', () => {
  let normalizer: ContentfulCmsComponentNormalizer;
  let mockRestrictionsService: jasmine.SpyObj<RestrictionsService>;

  beforeEach(() => {
    mockRestrictionsService = jasmine.createSpyObj('RestrictionsService', ['isEntryAccessible']);
    mockRestrictionsService.isEntryAccessible.and.returnValue(true);
    TestBed.configureTestingModule({
      providers: [ContentfulCmsComponentNormalizer, { provide: RestrictionsService, useValue: mockRestrictionsService }],
    });

    normalizer = TestBed.inject(ContentfulCmsComponentNormalizer);
  });

  it('should set uid and typeCode correctly', () => {
    const target: CmsComponent = {};
    const result = normalizer.convert(mockComponent as Entry<ComponentSkeleton, undefined, string>, target);

    expect(result).toEqual({
      name: 'Powertools Hompage Splash Banner Component',
      uid: 'entryId',
      typeCode: 'SimpleResponsiveBannerComponent',
      urlLink: '/Open-Catalogue/Tools/c/1355',
    } as CmsBannerComponent);
  });
});
