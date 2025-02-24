import { CmsBannerComponent, CmsNavigationComponent, CmsNavigationEntry, CmsNavigationNode, CmsProductCarouselComponent } from '@spartacus/core';

import { Asset, Entry, UnresolvedLink } from 'contentful';

import { CMSLinkComponentSkeleton, ComponentSkeleton, NavigationNodeSkeleton } from '../../../core/content-types';
import { isAsset, isMediaContainer, isNavigationNode, isResolvedEntry, isString } from '../../../core/type-guards';

export function normalizeMedia(source: Entry<ComponentSkeleton, undefined, string>, component: CmsBannerComponent): void {
  if (isMediaContainer(source.fields?.['mediaContainer'])) {
    const mediaContainer = source.fields['mediaContainer'];

    component.media = {
      desktop: normalizeMediaAsset(mediaContainer.fields['desktop']),
      mobile: normalizeMediaAsset(mediaContainer.fields['mobile']),
      tablet: normalizeMediaAsset(mediaContainer.fields['tablet']),
      widescreen: normalizeMediaAsset(mediaContainer.fields['widescreen']),
    };
    return;
  }

  if (isAsset(source.fields?.['media'])) {
    component.media = normalizeMediaAsset(source.fields['media']);
  }
}

function normalizeMediaAsset(media: UnresolvedLink<'Asset'> | Asset<undefined, string>) {
  if (isAsset(media)) {
    return {
      altText: '',
      code: '',
      mime: media.fields.file?.contentType ?? '',
      url: media.fields.file?.url ?? '',
    };
  }
  return undefined;
}

export function normalizeProductCodes(source: Entry<ComponentSkeleton, undefined, string>, component: CmsProductCarouselComponent): void {
  if (Array.isArray(source.fields['products'])) {
    component.productCodes = source.fields['products']
      .map((productUrl) => (isString(productUrl) ? productUrl.split('/').pop() : ''))
      .filter(Boolean)
      .join(' ');
  }
}

export function normalizeNavigationNode(source: Entry<ComponentSkeleton, undefined, string>, component: CmsNavigationComponent): void {
  if (isNavigationNode(source.fields?.['navigationNode'])) {
    const sourceNavigationNode = source.fields['navigationNode'];
    component.navigationNode = normalizeNavigationNodeChild(sourceNavigationNode);
  }
}

function normalizeNavigationNodeChild(source: Entry<NavigationNodeSkeleton, undefined, string>): CmsNavigationNode {
  return {
    uid: source.sys.id,
    title: isString(source.fields['title']) ? source.fields['title'] : '',
    children: source.fields['children']?.filter(isResolvedEntry).map(normalizeNavigationNodeChild),
    entries: source.fields['entries']?.filter(isResolvedEntry).map(normalizeNavigationNodeEntry),
  };
}

function normalizeNavigationNodeEntry(source: Entry<CMSLinkComponentSkeleton, undefined, string>): CmsNavigationEntry {
  return {
    itemId: source.sys.id,
    itemSuperType: 'AbstractCMSComponent',
    itemType: 'CMSLinkComponent',
  };
}
