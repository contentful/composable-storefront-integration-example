import { Injectable } from '@angular/core';

import { CmsBannerComponent, CmsComponent, Converter } from '@spartacus/core';
import { CmsBannerComponentMedia } from '@spartacus/core/src/model/cms.model';

import { Asset, Entry, UnresolvedLink } from 'contentful';

import { ComponentSkeleton } from '../../../../core/content-types';
import { isAsset, isMediaContainer } from '../../../../core/type-guards';

@Injectable({ providedIn: 'root' })
export class ContentfulCmsBannerComponentNormalizer implements Converter<Entry<ComponentSkeleton, undefined, string>, CmsComponent> {
  constructor() {}

  convert(source: Entry<ComponentSkeleton, undefined, string>, target: CmsComponent): CmsComponent {
    if (source.sys.contentType.sys.id === 'SimpleResponsiveBannerComponent') {
      this.normalizeMedia(source, target);
    }

    return target;
  }

  private normalizeMedia(source: Entry<ComponentSkeleton, undefined, string>, component: CmsBannerComponent): void {
    if (isMediaContainer(source.fields?.['mediaContainer'])) {
      const mediaContainer = source.fields['mediaContainer'];

      component.media = {
        desktop: this.normalizeMediaAsset(mediaContainer.fields['desktop']),
        mobile: this.normalizeMediaAsset(mediaContainer.fields['mobile']),
        tablet: this.normalizeMediaAsset(mediaContainer.fields['tablet']),
        widescreen: this.normalizeMediaAsset(mediaContainer.fields['widescreen']),
      };
      return;
    }

    if (isAsset(source.fields?.['media'])) {
      component.media = this.normalizeMediaAsset(source.fields['media']);
    }
  }

  private normalizeMediaAsset(media: UnresolvedLink<'Asset'> | Asset<undefined, string>): CmsBannerComponentMedia | undefined {
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
}
