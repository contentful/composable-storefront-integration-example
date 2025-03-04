import { TestBed } from '@angular/core/testing';

import { CmsProductCarouselComponent } from '@spartacus/core';

import { Entry } from 'contentful';

import { ComponentSkeleton } from '../../../../core/content-types';
import { DeepPartial } from '../../../../core/helpers';
import { ContentfulCmsProductCarouselComponentNormalizer } from './contentful-cms-product-carousel-component-normalizer';

const mockProducts: string[] = [
  'https://api.cm77gs48zv-contentfu1-d1-public.model-t.cc.commerce.ondemand.com/occ/v2/powertools-spa/products/3755219',
  'https://api.cm77gs48zv-contentfu1-d1-public.model-t.cc.commerce.ondemand.com/occ/v2/powertools-spa/products/3881018',
  'https://api.cm77gs48zv-contentfu1-d1-public.model-t.cc.commerce.ondemand.com/occ/v2/powertools-spa/products/3592865',
  'https://api.cm77gs48zv-contentfu1-d1-public.model-t.cc.commerce.ondemand.com/occ/v2/powertools-spa/products/2116279',
  'https://api.cm77gs48zv-contentfu1-d1-public.model-t.cc.commerce.ondemand.com/occ/v2/powertools-spa/products/3755204',
  'https://api.cm77gs48zv-contentfu1-d1-public.model-t.cc.commerce.ondemand.com/occ/v2/powertools-spa/products/1128762',
  'https://api.cm77gs48zv-contentfu1-d1-public.model-t.cc.commerce.ondemand.com/occ/v2/powertools-spa/products/3092788',
];

const initialMockComponentFields = {
  'products': mockProducts,
  'urlLink': '/Open-Catalogue/Tools/c/1355',
  'name': 'Powertools Hompage Splash Banner Component',
};

const mockComponent: DeepPartial<Entry<ComponentSkeleton, undefined, string>> = {
  'sys': {
    'id': 'entryId',
    'type': 'Entry',
    'contentType': {
      'sys': {
        'type': 'Link',
        'linkType': 'ContentType',
        'id': 'ProductCarouselComponent',
      },
    },
  },
  'fields': { ...initialMockComponentFields },
};

describe('Contentful CMS Product Carousel Normalizer', () => {
  let normalizer: ContentfulCmsProductCarouselComponentNormalizer;

  beforeEach(() => {
    mockComponent.fields = { ...initialMockComponentFields };

    TestBed.configureTestingModule({
      providers: [ContentfulCmsProductCarouselComponentNormalizer],
    });

    normalizer = TestBed.inject(ContentfulCmsProductCarouselComponentNormalizer);
  });

  it('should normalize product codes', () => {
    const component: CmsProductCarouselComponent = {
      typeCode: 'ProductCarouselComponent',
      productCodes: '',
    };
    normalizer.convert(mockComponent as Entry<ComponentSkeleton, undefined, string>, component);
    expect(component.productCodes).toEqual('3755219 3881018 3592865 2116279 3755204 1128762 3092788');
  });

  it('should normalize product codes with non-string values', () => {
    const component: CmsProductCarouselComponent = {
      typeCode: 'ProductCarouselComponent',
      productCodes: '',
    };

    const mockComponentWithNonStringProducts = { ...mockComponent, fields: { ...initialMockComponentFields, products: [1, 2, 3, 4, 5, 6, 7] } };

    normalizer.convert(mockComponentWithNonStringProducts as Entry<ComponentSkeleton, undefined, string>, component);
    expect(component.productCodes).toEqual('');
  });
});
