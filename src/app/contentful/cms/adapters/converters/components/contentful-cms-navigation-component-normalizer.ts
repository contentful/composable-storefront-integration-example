import { Injectable } from '@angular/core';

import { CmsComponent, CmsNavigationComponent, CmsNavigationEntry, CmsNavigationNode, Converter } from '@spartacus/core';

import { Entry } from 'contentful';

import { CMSLinkComponentSkeleton, ComponentSkeleton, NavigationNodeSkeleton } from '../../../../core/content-types';
import { isNavigationNode, isResolvedEntry, isString } from '../../../../core/type-guards';

@Injectable({ providedIn: 'root' })
export class ContentfulCmsNavigationComponentNormalizer implements Converter<Entry<ComponentSkeleton, undefined, string>, CmsComponent> {
  constructor() {}

  convert(source: Entry<ComponentSkeleton, undefined, string>, target: CmsComponent): CmsComponent {
    if (['CategoryNavigationComponent', 'FooterNavigationComponent', 'NavigationComponent'].includes(source.sys.contentType.sys.id)) {
      this.normalizeNavigationNode(source, target);
    }

    return target;
  }

  private normalizeNavigationNode(source: Entry<ComponentSkeleton, undefined, string>, component: CmsNavigationComponent): void {
    if (isNavigationNode(source.fields?.['navigationNode'])) {
      const sourceNavigationNode = source.fields['navigationNode'];
      component.navigationNode = this.normalizeNavigationNodeChild(sourceNavigationNode);
    }
  }

  private normalizeNavigationNodeChild(source: Entry<NavigationNodeSkeleton, undefined, string>): CmsNavigationNode {
    return {
      uid: source.sys.id,
      title: isString(source.fields['title']) ? source.fields['title'] : '',
      children: source.fields['children']?.filter(isResolvedEntry).map(this.normalizeNavigationNodeChild.bind(this)),
      entries: source.fields['entries']?.filter(isResolvedEntry).map(this.normalizeNavigationNodeEntry.bind(this)),
    };
  }

  private normalizeNavigationNodeEntry(source: Entry<CMSLinkComponentSkeleton, undefined, string>): CmsNavigationEntry {
    return {
      itemId: source.sys.id,
      itemSuperType: 'AbstractCMSComponent',
      itemType: 'CMSLinkComponent',
    };
  }
}
