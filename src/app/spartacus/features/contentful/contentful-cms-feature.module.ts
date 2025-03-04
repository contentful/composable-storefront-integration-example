import { NgModule } from '@angular/core';

import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';

import { ContentfulCmsModule } from '../../../contentful/cms/contentful-cms.module';
import { ContentfulCoreModule } from '../../../contentful/core/contentful-core.module';

import { contentfulTranslationChunksConfig, contentfulTranslations } from '../../../contentful/assets/translations/translations';
import { CONTENTFUL_FEATURE, ContentfulRootModule } from '../../../contentful/root';

@NgModule({
  declarations: [],
  imports: [ContentfulRootModule, ContentfulCmsModule, ContentfulCoreModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [CONTENTFUL_FEATURE]: {
          module: () => import('../../../contentful/contentful.module').then((m) => m.ContentfulModule),
        },
      },
      cmsComponents: {}, // custom components
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: contentfulTranslations,
        chunks: contentfulTranslationChunksConfig,
      },
    }),
  ],
})
export class ContentfulCMSFeatureModule {}
