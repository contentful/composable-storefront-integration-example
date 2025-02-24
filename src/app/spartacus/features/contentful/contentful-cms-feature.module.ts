import { NgModule } from '@angular/core';

import { CmsConfig, provideConfig } from '@spartacus/core';

import { ContentfulCmsModule } from '../../../contentful/cms/contentful-cms.module';
import { ContentfulCoreModule } from '../../../contentful/core/contentful-core.module';

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
  ],
})
export class ContentfulCMSFeatureModule {}
