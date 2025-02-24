import { SlotConfig, SlotGroup } from '@spartacus/storefront';

import { Asset, Entry, UnresolvedLink } from 'contentful';

import { NavigationNodeSkeleton } from './content-types';
import { DeepPartial } from './helpers';
import { isAsset, isEntry, isNavigationNode, isResolvedEntry, isSlotConfig, isSlotGroup } from './type-guards';

const mockNavigationNode: DeepPartial<Entry<NavigationNodeSkeleton, undefined, string>> = {
  'sys': {
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
    'uid': 'SandersNavNode',
    'entries': [],
    'title': 'Sanders',
  },
};

const mockUnresolvedEntry: DeepPartial<UnresolvedLink<'Entry'>> = {
  'sys': {
    'type': 'Link',
    'linkType': 'Entry',
    'id': 'unresolvedEntryId',
  },
};

const mockMedia: DeepPartial<Asset<undefined, string>> = {
  'sys': {
    'type': 'Asset',
    'locale': 'en',
  },
  'fields': {
    'title': 'Powertools_350x280_25Deal_EN_01_350W.jpg',
    'description': '25% Great Prices and Great Deals',
    'file': {
      'url': '//images.ctfassets.net/iuusg1rrhk56/6Kl4PourJx6vEokqgQuBgE/6a199949381a04d4f9d36e8b0bc3c15b/Powertools-350x280-25Deal-EN-01-350W.jpg',
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

const mockSlotConfig: SlotConfig = {
  'pageFold': 'Section2B',
  'slots': ['Section1', 'Section2A', 'Section2B', 'Section2C', 'Section3', 'Section4', 'Section5'],
};

const mockSlotGroupConfig: SlotConfig & SlotGroup = {
  'lg': {
    'slots': [],
  },
  'slots': ['SiteLogin', 'NavigationBar', 'SiteContext', 'SiteLinks'],
};

describe('Type Guards', () => {
  it('should identify an Asset', () => {
    expect(isAsset(mockMedia)).toBe(true);
    expect(isAsset(mockNavigationNode)).toBe(false);
  });

  it('should identify an Entry', () => {
    expect(isEntry(mockNavigationNode)).toBe(true);
    expect(isEntry(mockMedia)).toBe(false);
  });

  it('should identify a NavigationNode', () => {
    expect(isNavigationNode(mockNavigationNode)).toBe(true);
    expect(isNavigationNode(mockMedia)).toBe(false);
  });

  it('should identify a Resolved Entry', () => {
    expect(isResolvedEntry(mockNavigationNode as Entry<NavigationNodeSkeleton, undefined, string>)).toBe(true);
    expect(isResolvedEntry(mockUnresolvedEntry as UnresolvedLink<'Entry'>)).toBe(false);
  });

  it('should identify a SlotConfig', () => {
    expect(isSlotConfig(mockSlotConfig)).toBe(true);
    expect(isSlotConfig(mockSlotGroupConfig)).toBe(true);
    expect(isSlotConfig(undefined)).toBe(false);
  });

  it('should identify a SlotGroup', () => {
    expect(isSlotGroup(mockSlotGroupConfig)).toBe(true);
    expect(isSlotGroup(mockSlotConfig)).toBe(false);
  });
});
