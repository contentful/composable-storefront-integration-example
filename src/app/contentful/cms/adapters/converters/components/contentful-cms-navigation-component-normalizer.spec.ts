import { TestBed } from '@angular/core/testing';

import { CmsNavigationComponent } from '@spartacus/core';

import { Entry } from 'contentful';

import { ComponentSkeleton, NavigationNodeSkeleton } from '../../../../core/content-types';
import { DeepPartial } from '../../../../core/helpers';
import { ContentfulCmsNavigationComponentNormalizer } from './contentful-cms-navigation-component-normalizer';

const mockNavigationNode: DeepPartial<Entry<NavigationNodeSkeleton, undefined, string>> = {
  'sys': {
    'id': 'categoryNavNodeId',
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
    'uid': 'PowertoolsCategoryNavNode',
    'children': [
      {
        'sys': {
          'id': 'firstLevelNavNodeId',
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
          'uid': 'SafetyNavNode',
          'children': [
            {
              'metadata': {
                'tags': [],
                'concepts': [],
              },
              'sys': {
                'id': 'secondLevelNavNodeId',
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
                'uid': 'FootwearLinksNavNode',
                'children': [
                  {
                    'metadata': {
                      'tags': [],
                      'concepts': [],
                    },
                    'sys': {
                      'id': 'thirdLevelNavNodeId',
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
                      'uid': 'FootwearMensCategoryNavNode',
                      'entries': [
                        {
                          'sys': {
                            'id': 'linkEntryId',
                            'type': 'Entry',
                            'contentType': {
                              'sys': {
                                'type': 'Link',
                                'linkType': 'ContentType',
                                'id': 'CMSLinkComponent',
                              },
                            },
                          },
                          'fields': {
                            'name': "Footwear Men's Category Link",
                            'linkName': "Men's",
                            'url': '/Open-Catalogue/Office-Equipment%2C-Supplies-%26-Accessories/Hand-Tools/Safety/Footwear/Mens/c/1805',
                            'target': false,
                          },
                        },
                      ],
                    },
                  },
                ],
                'title': 'Footwear',
              },
            },
          ],
          'entries': [
            {
              'metadata': {
                'tags': [],
                'concepts': [],
              },
              'sys': {
                'id': 'linkEntryCategoryId',
                'type': 'Entry',
                'contentType': {
                  'sys': {
                    'type': 'Link',
                    'linkType': 'ContentType',
                    'id': 'CMSLinkComponent',
                  },
                },
              },
              'fields': {
                'name': 'Safety Category Link',
                'linkName': 'Safety',
                'url': '/Open-Catalogue/Office-Equipment%2C-Supplies-%26-Accessories/Hand-Tools/Safety/c/1800',
                'target': false,
              },
            },
          ],
          'title': 'Safety',
        },
      },
    ],
  },
};

const initialMockComponentFields = {
  'navigationNode': mockNavigationNode as Entry<NavigationNodeSkeleton, undefined, string>,
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
        'id': 'CategoryNavigationComponent',
      },
    },
  },
  'fields': { ...initialMockComponentFields },
};

describe('Contentful CMS Navigation Node Normalizer', () => {
  let normalizer: ContentfulCmsNavigationComponentNormalizer;

  beforeEach(() => {
    mockComponent.fields = { ...initialMockComponentFields };

    TestBed.configureTestingModule({
      providers: [ContentfulCmsNavigationComponentNormalizer],
    });

    normalizer = TestBed.inject(ContentfulCmsNavigationComponentNormalizer);
  });

  it('should normalize navigation node', () => {
    const component: CmsNavigationComponent = {
      typeCode: 'CategoryNavigationComponent',
      navigationNode: {},
    };
    normalizer.convert(mockComponent as Entry<ComponentSkeleton, undefined, string>, component);

    expect(component.navigationNode).toEqual({
      uid: 'categoryNavNodeId',
      title: '',
      children: [
        {
          uid: 'firstLevelNavNodeId',
          title: 'Safety',
          children: [
            {
              uid: 'secondLevelNavNodeId',
              title: 'Footwear',
              children: [
                {
                  uid: 'thirdLevelNavNodeId',
                  title: '',
                  children: undefined,
                  entries: [
                    {
                      itemId: 'linkEntryId',
                      itemSuperType: 'AbstractCMSComponent',
                      itemType: 'CMSLinkComponent',
                    },
                  ],
                },
              ],
              entries: undefined,
            },
          ],
          entries: [
            {
              itemId: 'linkEntryCategoryId',
              itemSuperType: 'AbstractCMSComponent',
              itemType: 'CMSLinkComponent',
            },
          ],
        },
      ],
      entries: undefined,
    });
  });
});
