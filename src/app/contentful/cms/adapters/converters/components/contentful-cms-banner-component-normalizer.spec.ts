import { TestBed } from '@angular/core/testing';

import { CmsBannerComponent, CmsResponsiveBannerComponentMedia } from '@spartacus/core';

import { Asset, Entry } from 'contentful';

import { ComponentSkeleton, MediaContainerSkeleton } from '../../../../core/content-types';
import { DeepPartial } from '../../../../core/helpers';
import { ContentfulCmsBannerComponentNormalizer } from './contentful-cms-banner-component-normalizer';

const mockMedia: DeepPartial<Asset<undefined, string>> = {
  'sys': {
    'type': 'Asset',
    'locale': 'en',
  },
  'fields': {
    'title': 'Powertools_350x280_25Deal_EN_01_350W.jpg',
    'description': '25% Great Prices and Great Deals',
    'file': {
      'url': '//images.ctfassets.net/spaceId/2I0Vb1eknVwnABIEZBzmKq/05205806d60e4eab3df932e39319acc8/Powertools-1400x480-BigSplash-EN-01-1400W.jpg',
      'details': {
        'size': 9010,
        'image': {
          'width': 350,
          'height': 280,
        },
      },
      'fileName': 'Powertools-350x280-25Deal-EN-01-350W.jpg',
      'contentType': 'image/jpeg',
    },
  },
};

const mockMediaWithoutFile: DeepPartial<Asset<undefined, string>> = {
  'sys': {
    'type': 'Asset',
    'locale': 'en',
  },
  'fields': {
    'title': 'Powertools_350x280_25Deal_EN_01_350W.jpg',
    'description': '25% Great Prices and Great Deals',
  },
};

const initialMockMediaContainerFields: DeepPartial<Entry<MediaContainerSkeleton, undefined, string>['fields']> = {
  'name': 'Powertools Homepage Splash',
  'desktop': {
    'sys': {
      'id': 'mockMediaDesktopId',
      'type': 'Asset',
    },
    'fields': {
      'title': 'Powertools Homepage Splash Desktop',
      'description': '',
      'file': {
        'url': '//images.ctfassets.net/iuusg1rrhk56/7LMGJdyn2gwTeJcQ0cI4aX/5e0af86064bb70cf04892ef58fb6bf55/Powertools_960x400_BigSplash_EN_01_960W.jpg',
        'fileName': 'Powertools_960x400_BigSplash_EN_01_960W.jpg',
        'contentType': 'image/jpeg',
      },
    },
  },
  'mobile': {
    'sys': {
      'id': 'mockMediaMobileId',
      'type': 'Asset',
    },
    'fields': {
      'title': 'Powertools Homepage Splash Mobile',
      'description': '',
      'file': {
        'url': '//images.ctfassets.net/iuusg1rrhk56/5J4I6oBiine9HXDXPUcKsA/ed75757c741f9c9e378db9327e577f95/Powertools_320x300_BigSplash_EN_01_320W.jpg',
        'contentType': 'image/jpeg',
      },
    },
  },
  'tablet': {
    'sys': {
      'id': 'mockMediaTabletId',
      'type': 'Asset',
    },
    'fields': {
      'title': 'Powertools Homepage Splash Tablet',
      'description': '',
      'file': {
        'url': '//images.ctfassets.net/iuusg1rrhk56/3oj9q97TcWkYcNZnZNpn8B/fb2608c01f7e27b22b62e0855f21ff49/Powertools_770x350_BigSplash_EN_01_770W.jpg',
        'contentType': 'image/jpeg',
      },
    },
  },
  'widescreen': {
    'sys': {
      'id': 'mockMediaWidescreenId',
      'type': 'Asset',
    },
    'fields': {
      'title': 'Powertools Homepage Splash Widescreen',
      'description': '',
      'file': {
        'url': '//images.ctfassets.net/iuusg1rrhk56/6SQPtppPW3JhyI41IFrilV/5d3345ea81b9bcbb50f95f543e1190d2/Powertools_1400x480_BigSplash_EN_01_1400W.jpg',
        'contentType': 'image/jpeg',
      },
    },
  },
};

const mockMediaContainer: DeepPartial<Entry<MediaContainerSkeleton, undefined, string>> = {
  'sys': {
    'id': 'mockMediaContainerId',
    'type': 'Entry',
    'contentType': {
      'sys': {
        'type': 'Link',
        'linkType': 'ContentType',
        'id': 'MediaContainer',
      },
    },
  },
  'fields': { ...initialMockMediaContainerFields },
};

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
  'media': mockMedia as Asset<undefined, string>,
};

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
  'fields': { ...initialMockComponentFields },
};

describe('Contentful CMS Banner Normalizer', () => {
  let normalizer: ContentfulCmsBannerComponentNormalizer;

  beforeEach(() => {
    mockComponent.fields = { ...initialMockComponentFields };
    mockMediaContainer.fields = { ...initialMockMediaContainerFields };

    TestBed.configureTestingModule({
      providers: [ContentfulCmsBannerComponentNormalizer],
    });

    normalizer = TestBed.inject(ContentfulCmsBannerComponentNormalizer);
  });

  it('should normalize media', () => {
    const component: CmsBannerComponent = {
      typeCode: 'SimpleResponsiveBannerComponent',
      media: {},
    };

    mockComponent.fields = { ...initialMockComponentFields, media: mockMedia };

    normalizer.convert(mockComponent as Entry<ComponentSkeleton, undefined, string>, component);
    expect(component.media).toEqual({
      altText: '',
      code: '',
      mime: 'image/jpeg',
      url: '//images.ctfassets.net/spaceId/2I0Vb1eknVwnABIEZBzmKq/05205806d60e4eab3df932e39319acc8/Powertools-1400x480-BigSplash-EN-01-1400W.jpg',
    });
  });

  it('should normalize media without file', () => {
    const component: CmsBannerComponent = {
      typeCode: 'SimpleResponsiveBannerComponent',
      media: {},
    };

    mockComponent.fields = { ...initialMockComponentFields, media: mockMediaWithoutFile };

    normalizer.convert(mockComponent as Entry<ComponentSkeleton, undefined, string>, component);
    expect(component.media).toEqual({
      altText: '',
      code: '',
      mime: '',
      url: '',
    });
  });

  it('should not normalize non-asset media property', () => {
    const component: CmsBannerComponent = {
      typeCode: 'SimpleResponsiveBannerComponent',
      media: {},
    };

    mockComponent.fields = { ...initialMockComponentFields, media: mockProducts };

    normalizer.convert(mockComponent as Entry<ComponentSkeleton, undefined, string>, component);
    expect(component.media).toEqual({});
  });

  it('should normalize media container', () => {
    const component: CmsBannerComponent = {
      typeCode: 'SimpleResponsiveBannerComponent',
      media: {},
    };
    mockComponent.fields = { ...initialMockComponentFields, media: mockMedia, mediaContainer: mockMediaContainer };

    normalizer.convert(mockComponent as Entry<ComponentSkeleton, undefined, string>, component);

    expect(component.media).toEqual({
      desktop: {
        altText: '',
        code: '',
        mime: 'image/jpeg',
        url: '//images.ctfassets.net/iuusg1rrhk56/7LMGJdyn2gwTeJcQ0cI4aX/5e0af86064bb70cf04892ef58fb6bf55/Powertools_960x400_BigSplash_EN_01_960W.jpg',
      },
      mobile: {
        altText: '',
        code: '',
        mime: 'image/jpeg',
        url: '//images.ctfassets.net/iuusg1rrhk56/5J4I6oBiine9HXDXPUcKsA/ed75757c741f9c9e378db9327e577f95/Powertools_320x300_BigSplash_EN_01_320W.jpg',
      },
      tablet: {
        altText: '',
        code: '',
        mime: 'image/jpeg',
        url: '//images.ctfassets.net/iuusg1rrhk56/3oj9q97TcWkYcNZnZNpn8B/fb2608c01f7e27b22b62e0855f21ff49/Powertools_770x350_BigSplash_EN_01_770W.jpg',
      },
      widescreen: {
        altText: '',
        code: '',
        mime: 'image/jpeg',
        url: '//images.ctfassets.net/iuusg1rrhk56/6SQPtppPW3JhyI41IFrilV/5d3345ea81b9bcbb50f95f543e1190d2/Powertools_1400x480_BigSplash_EN_01_1400W.jpg',
      },
    });
  });

  it('should not normalize non-asset media container property', () => {
    const component: CmsBannerComponent = {
      typeCode: 'SimpleResponsiveBannerComponent',
      media: {},
    };

    const mediaContainer = { ...mockMediaContainer, fields: { ...initialMockMediaContainerFields, desktop: mockProducts } };

    mockComponent.fields = { ...initialMockComponentFields, mediaContainer: mediaContainer };
    normalizer.convert(mockComponent as Entry<ComponentSkeleton, undefined, string>, component);

    expect((component.media as CmsResponsiveBannerComponentMedia).desktop).toEqual(undefined);
  });
});
