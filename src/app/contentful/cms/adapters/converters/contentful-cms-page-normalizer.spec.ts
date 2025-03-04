import { TestBed } from '@angular/core/testing';

import { CmsComponent, CmsStructureModel, Converter, ConverterService, PageRobotsMeta } from '@spartacus/core';
import { LayoutConfig } from '@spartacus/storefront';

import { Entry } from 'contentful';

import { ComponentSkeleton, FooterSkeleton, HeaderSkeleton, PageSkeleton } from '../../../core/content-types';
import { DeepPartial } from '../../../core/helpers';
import { RestrictionsService } from '../../../core/services/contentful-restrictions.service';
import { ContentfulCmsPageNormalizer } from './contentful-cms-page-normalizer';

const mockSiteLogoComponent: DeepPartial<Entry<ComponentSkeleton, undefined, string>> = {
  'sys': {
    'id': 'siteLogo',
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
    'name': 'Site Logo',
    'media': {
      'sys': {
        'id': 'logoAsset',
        'type': 'Asset',
      },
      'fields': {
        'title': 'SAP_scrn_R.png',
        'description': 'SAP logo',
        'file': {
          'url': '//images.ctfassets.net/iuusg1rrhk56/7zshSvLWmN9YVXzbVjLjtl/688d76cd436e7a52c71641faeba2eb5a/SAP-scrn-R.png',
          'details': {
            'size': 10127,
            'image': {
              'width': 300,
              'height': 149,
            },
          },
          'fileName': 'SAP-scrn-R.png',
          'contentType': 'image/png',
        },
      },
    },
    'urlLink': '/',
  },
};

const mockMiniCartComponent: DeepPartial<Entry<ComponentSkeleton, undefined, string>> = {
  'sys': {
    'id': 'miniCart',
    'type': 'Entry',
    'contentType': {
      'sys': {
        'type': 'Link',
        'linkType': 'ContentType',
        'id': 'MiniCartComponent',
      },
    },
  },
  'fields': {
    'name': 'Mini Cart',
    'shownProductCount': 3,
    'title': 'YOUR SHOPPING CART',
    'totalDisplay': 'SUBTOTAL',
  },
};

const mockHeader: DeepPartial<Entry<HeaderSkeleton, undefined, string>> = {
  'sys': {
    'id': 'header',
    'type': 'Entry',
    'contentType': {
      'sys': {
        'type': 'Link',
        'linkType': 'ContentType',
        'id': 'cmsHeader',
      },
    },
  },
  'fields': {
    'name': 'Powertools Store Default Header',
    'SiteLogo': [mockSiteLogoComponent as Entry<ComponentSkeleton, undefined, string>],
    'MiniCart': [mockMiniCartComponent as Entry<ComponentSkeleton, undefined, string>],
  },
};

const mockFooterNavigationComponent: DeepPartial<Entry<ComponentSkeleton, undefined, string>> = {
  'sys': {
    'id': 'footerNavigation',
    'type': 'Entry',
    'contentType': {
      'sys': {
        'type': 'Link',
        'linkType': 'ContentType',
        'id': 'FooterNavigationComponent',
      },
    },
  },
  'fields': {
    'name': 'Footer Navigation Component',
    'notice': 'Copyright © 2024 SAP SE or an SAP affiliate company. All rights reserved.',
    'navigationNode': {
      'sys': {
        'id': 'footerNavNode',
        'type': 'Entry',
        'contentType': {
          'sys': {
            'type': 'Link',
            'linkType': 'ContentType',
            'id': 'NavNode',
          },
        },
      },
      'fields': {
        'uid': 'FooterNavNode',
        'children': [],
      },
    },
    'wrapAfter': 4,
    'showLanguageCurrency': true,
  },
};

const mockAnonymousConsentOpenDialogComponent: DeepPartial<Entry<ComponentSkeleton, undefined, string>> = {
  'sys': {
    'id': 'anonymousConsentOpenDialog',
    'type': 'Entry',
    'contentType': {
      'sys': {
        'type': 'Link',
        'linkType': 'ContentType',
        'id': 'CMSFlexComponent',
      },
    },
  },
  'fields': {
    'name': 'Anonymous Consent Management Open Dialog',
    'flexType': 'AnonymousConsentOpenDialogComponent',
  },
};

const mockFooter: DeepPartial<Entry<FooterSkeleton, undefined, string>> = {
  'sys': {
    'id': 'footer',
    'type': 'Entry',
    'contentType': {
      'sys': {
        'type': 'Link',
        'linkType': 'ContentType',
        'id': 'cmsFooter',
      },
    },
  },
  'fields': {
    'name': 'Powertools Store Default Footer',
    'Footer': [
      mockFooterNavigationComponent as Entry<ComponentSkeleton, undefined, string>,
      mockAnonymousConsentOpenDialogComponent as Entry<ComponentSkeleton, undefined, string>,
    ],
  },
};

const mockSection1Component1: DeepPartial<Entry<ComponentSkeleton, undefined, string>> = {
  'sys': {
    'id': 'section1Component1',
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
    'name': 'The Most Powerful Tools Banner',
    'media': {
      'sys': {
        'id': '2I0Vb1eknVwnABIEZBzmKq',
        'type': 'Asset',
      },
      'fields': {
        'title': 'Powertools_1400x480_BigSplash_EN_01_1400W.jpg',
        'description': 'The Most Powerful Tools in their Price Range',
        'file': {
          'url': '//images.ctfassets.net/iuusg1rrhk56/2I0Vb1eknVwnABIEZBzmKq/05205806d60e4eab3df932e39319acc8/Powertools-1400x480-BigSplash-EN-01-1400W.jpg',
          'details': {
            'size': 102485,
            'image': {
              'width': 1400,
              'height': 384,
            },
          },
          'fileName': 'Powertools-1400x480-BigSplash-EN-01-1400W.jpg',
          'contentType': 'image/jpeg',
        },
      },
    },
    'urlLink': '/Open-Catalogue/Tools/c/1355',
  },
};

const mockSection1Component2: DeepPartial<Entry<ComponentSkeleton, undefined, string>> = {
  'sys': {
    'id': 'section1Component2',
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
    'name': 'Brands Banner',
    'media': {
      'sys': {
        'id': 'bannerAsset',
        'type': 'Asset',
      },
      'fields': {
        'title': 'Powertools_1400x70_Brands_EN_01_1400W.jpg',
        'description': 'Bosch | Black & Decker | Einhall | Skil | Hitachi',
        'file': {
          'url': '//images.ctfassets.net/iuusg1rrhk56/30b3mP1z5VuIcj3lqAMQxR/9a65517036b8ccc334c788d87ff8b3fe/Powertools-1400x70-Brands-EN-01-1400W.jpg',
          'details': {
            'size': 22768,
            'image': {
              'width': 1400,
              'height': 70,
            },
          },
          'fileName': 'Powertools-1400x70-Brands-EN-01-1400W.jpg',
          'contentType': 'image/jpeg',
        },
      },
    },
    'urlLink': '/Brands/c/brands',
  },
};

const mockBreadcrumbComponent: DeepPartial<Entry<ComponentSkeleton, undefined, string>> = {
  'sys': {
    'type': 'Entry',
    'id': 'breadcrumbComponent',
    'contentType': {
      'sys': {
        'type': 'Link',
        'linkType': 'ContentType',
        'id': 'BreadcrumbComponent',
      },
    },
  },
  'fields': {
    'name': 'Breadcrumb CMS Component',
  },
};

const mockPage: DeepPartial<Entry<PageSkeleton>> = {
  'sys': {
    'id': 'page',
    'type': 'Entry',
    'contentType': {
      'sys': {
        'type': 'Link',
        'linkType': 'ContentType',
        'id': 'cmsPage',
      },
    },
    'locale': 'en',
  },
  'fields': {
    'internalName': 'Homepage',
    'title': 'Homepage',
    'label': 'Homepage',
    'description': 'Powertools store homepage',
    'robots': 'index, follow',
    'slug': 'homepage',
    'type': 'ContentPage',
    'header': mockHeader as Entry<HeaderSkeleton, undefined, string>,
    'footer': mockFooter as Entry<FooterSkeleton, undefined, string>,
    'template': 'LandingPage2Template',
    'Section1': [mockSection1Component1 as Entry<ComponentSkeleton, undefined, string>, mockSection1Component2 as Entry<ComponentSkeleton, undefined, string>],
    'BottomHeaderSlot': [mockBreadcrumbComponent as Entry<ComponentSkeleton, undefined, string>],
  } as any,
};

const mockLayoutConfig: LayoutConfig = {
  layoutSlots: {
    LandingPage2Template: {
      slots: ['Section1', 'SiteLogo', 'MiniCart', 'Footer'],
    },
    header: {
      slots: ['SiteLogo', 'MiniCart'],
    },
    footer: {
      slots: ['Footer'],
    },
  },
};

describe('ContentfulCmsPageNormalizer', () => {
  let normalizer: ContentfulCmsPageNormalizer;
  let mockRestrictionsService: jasmine.SpyObj<RestrictionsService>;
  let mockConverter: jasmine.SpyObj<Converter<Entry<ComponentSkeleton, undefined, string>, CmsComponent>>;

  beforeEach(() => {
    mockRestrictionsService = jasmine.createSpyObj('RestrictionsService', ['isEntryAccessible']);
    mockRestrictionsService.isEntryAccessible.and.returnValue(true);

    mockConverter = jasmine.createSpyObj('ConverterService', ['convert']);

    TestBed.configureTestingModule({
      providers: [
        ContentfulCmsPageNormalizer,
        { provide: LayoutConfig, useValue: mockLayoutConfig },
        { provide: RestrictionsService, useValue: mockRestrictionsService },
        { provide: ConverterService, useValue: mockConverter },
      ],
    });
    normalizer = TestBed.inject(ContentfulCmsPageNormalizer);
  });

  it('should normalize page data correctly', () => {
    const target: CmsStructureModel = {};

    normalizer.convert(mockPage as Entry<PageSkeleton, undefined, string>, target);

    expect(target.page).toBeDefined();
    expect(target.page?.name).toBe('Homepage');
    expect(target.page?.label).toBe('/homepage');
    expect(target.page?.title).toBe('Homepage');
    expect(target.page?.description).toBe('Powertools store homepage');
    expect(target.page?.template).toBe('LandingPage2Template');
    expect(target.page?.type).toBe('ContentPage');
    expect(target.page?.pageId).toBe('page');
    expect(target.page?.robots).toEqual([PageRobotsMeta.INDEX, PageRobotsMeta.FOLLOW]);
  });

  it('should normalize entry slot data correctly', () => {
    const target: CmsStructureModel = {};

    normalizer.convert(mockPage as Entry<PageSkeleton, undefined, string>, target);

    expect(target.page?.slots?.['Section1'].components).toBeDefined();
    expect(target.page?.slots?.['SiteLogo'].components).toBeDefined();
    expect(target.page?.slots?.['MiniCart'].components).toBeDefined();
    expect(target.page?.slots?.['Footer'].components).toBeDefined();
    expect(target.page?.slots?.['BottomHeaderSlot'].components).toBeDefined();
  });

  it('should normalize entry component data correctly', () => {
    const target: CmsStructureModel = {};

    normalizer.convert(mockPage as Entry<PageSkeleton, undefined, string>, target);

    expect(target.page?.slots?.['Section1'].components?.length).toBe(2);
    expect(target.page?.slots?.['Section1'].components?.some((component) => component.uid === 'section1Component1')).toBeTrue();

    const section1Component2 = target.page?.slots?.['Section1'].components?.find((component) => component.uid === 'section1Component2');
    expect(section1Component2?.flexType).toBe('SimpleResponsiveBannerComponent');
    expect(section1Component2?.typeCode).toBe('SimpleResponsiveBannerComponent');
    expect(section1Component2?.properties?.data).toBeDefined();
    expect(section1Component2?.properties?.data.sys.id).toBe('section1Component2');

    expect(target.page?.slots?.['SiteLogo'].components?.length).toBe(1);
    expect(target.page?.slots?.['SiteLogo'].components?.some((component) => component.uid === 'siteLogo')).toBeTrue();

    expect(target.page?.slots?.['MiniCart'].components?.length).toBe(1);
    expect(target.page?.slots?.['MiniCart'].components?.some((component) => component.uid === 'miniCart')).toBeTrue();

    expect(target.page?.slots?.['Footer'].components?.length).toBe(2);
    expect(target.page?.slots?.['Footer'].components?.some((component) => component.uid === 'footerNavigation')).toBeTrue();

    const anonymousConsentOpenDialog = target.page?.slots?.['Footer'].components?.find((component) => component.uid === 'anonymousConsentOpenDialog');
    expect(anonymousConsentOpenDialog?.flexType).toBe('AnonymousConsentOpenDialogComponent');
    expect(anonymousConsentOpenDialog?.typeCode).toBe('CMSFlexComponent');
    expect(anonymousConsentOpenDialog?.properties?.data).toBeDefined();
    expect(anonymousConsentOpenDialog?.properties?.data.sys.id).toBe('anonymousConsentOpenDialog');
  });

  it('should normalize component data correctly', () => {
    const target: CmsStructureModel = {};

    normalizer.convert(mockPage as Entry<PageSkeleton, undefined, string>, target);

    expect(mockConverter.convert).toHaveBeenCalledWith(mockSection1Component1 as Entry<ComponentSkeleton, undefined, string>, jasmine.any(Object));
    expect(mockConverter.convert).toHaveBeenCalledWith(mockSection1Component2 as Entry<ComponentSkeleton, undefined, string>, jasmine.any(Object));
    expect(mockConverter.convert).toHaveBeenCalledWith(mockBreadcrumbComponent as Entry<FooterSkeleton, undefined, string>, jasmine.any(Object));
    expect(mockConverter.convert).toHaveBeenCalledWith(mockSiteLogoComponent as Entry<ComponentSkeleton, undefined, string>, jasmine.any(Object));
    expect(mockConverter.convert).toHaveBeenCalledWith(mockMiniCartComponent as Entry<ComponentSkeleton, undefined, string>, jasmine.any(Object));
    expect(mockConverter.convert).toHaveBeenCalledWith(mockFooterNavigationComponent as Entry<FooterSkeleton, undefined, string>, jasmine.any(Object));
    expect(mockConverter.convert).toHaveBeenCalledWith(
      mockAnonymousConsentOpenDialogComponent as Entry<ComponentSkeleton, undefined, string>,
      jasmine.any(Object),
    );
  });
});
