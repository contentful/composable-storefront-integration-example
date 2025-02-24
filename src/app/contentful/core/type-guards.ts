import { BREAKPOINT, LayoutSlotConfig, SlotConfig, SlotGroup } from '@spartacus/storefront';

import { Asset, Entry, EntrySkeletonType, UnresolvedLink } from 'contentful';

import { MediaContainerSkeleton, NavigationNodeSkeleton } from './content-types';

export function isString(field: unknown): field is string {
  return typeof field === 'string';
}

export function isAsset(field: unknown): field is Asset {
  return (
    typeof field === 'object' &&
    field !== null &&
    'sys' in field &&
    typeof field.sys === 'object' &&
    field.sys !== null &&
    'type' in field.sys &&
    field.sys.type === 'Asset'
  );
}

export function isEntry<T extends EntrySkeletonType>(field: unknown): field is Entry<T, undefined, string> {
  return (
    typeof field === 'object' &&
    field !== null &&
    'sys' in field &&
    typeof field.sys === 'object' &&
    field.sys !== null &&
    'type' in field.sys &&
    field.sys.type === 'Entry'
  );
}

export function isNavigationNode(field: unknown): field is Entry<NavigationNodeSkeleton, undefined, string> {
  return isEntry(field) && field.sys.contentType.sys.id === 'NavNode';
}

export function isMediaContainer(field: unknown): field is Entry<MediaContainerSkeleton, undefined, string> {
  return isEntry(field) && field.sys.contentType.sys.id === 'MediaContainer';
}

export function isResolvedEntry<T extends EntrySkeletonType>(
  entry: UnresolvedLink<'Entry'> | Entry<T, undefined, string>,
): entry is Entry<T, undefined, string> {
  return entry.sys.type === 'Entry';
}

export function isSlotConfig(configurationSlots: LayoutSlotConfig | SlotConfig | SlotGroup | undefined): configurationSlots is SlotConfig {
  return (
    typeof configurationSlots === 'object' &&
    configurationSlots !== null &&
    'slots' in configurationSlots &&
    Array.isArray(configurationSlots.slots) &&
    (configurationSlots.slots.length === 0 || configurationSlots.slots.every((slot) => typeof slot === 'string'))
  );
}

export function isSlotGroup(configurationSlots: LayoutSlotConfig | SlotConfig | SlotGroup | undefined): configurationSlots is SlotGroup {
  return (
    typeof configurationSlots === 'object' &&
    configurationSlots !== null &&
    Object.values(BREAKPOINT)
      .filter((value) => value !== BREAKPOINT.xl)
      .some((value) => value in configurationSlots)
  );
}
