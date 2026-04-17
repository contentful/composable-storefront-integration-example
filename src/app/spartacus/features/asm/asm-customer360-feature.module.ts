import { NgModule } from '@angular/core';

import { asmCustomer360TranslationChunksConfig, asmCustomer360TranslationsDe, asmCustomer360TranslationsEn } from '@spartacus/asm/customer-360/assets';
import { ASM_CUSTOMER_360_FEATURE, AsmCustomer360RootModule } from '@spartacus/asm/customer-360/root';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';

@NgModule({
  declarations: [],
  imports: [AsmCustomer360RootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ASM_CUSTOMER_360_FEATURE]: {
          module: () => import('@spartacus/asm/customer-360').then((m) => m.AsmCustomer360Module),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: asmCustomer360TranslationsEn, de: asmCustomer360TranslationsDe },
        chunks: asmCustomer360TranslationChunksConfig,
      },
    }),
  ],
})
export class AsmCustomer360FeatureModule {}
