import { NgModule } from '@angular/core';

import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import { organizationTranslationChunksConfig, organizationTranslationsDe, organizationTranslationsEn } from '@spartacus/organization/administration/assets';
import { AdministrationRootModule, ORGANIZATION_ADMINISTRATION_FEATURE } from '@spartacus/organization/administration/root';

@NgModule({
  declarations: [],
  imports: [AdministrationRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ORGANIZATION_ADMINISTRATION_FEATURE]: {
          module: () => import('@spartacus/organization/administration').then((m) => m.AdministrationModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: organizationTranslationsEn, de: organizationTranslationsDe },
        chunks: organizationTranslationChunksConfig,
      },
    }),
  ],
})
export class OrganizationAdministrationFeatureModule {}
