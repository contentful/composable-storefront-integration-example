import { NgModule } from '@angular/core';

import { checkoutB2BTranslationChunksConfig, checkoutB2BTranslationsDe, checkoutB2BTranslationsEn } from '@spartacus/checkout/b2b/assets';
import { CheckoutB2BRootModule } from '@spartacus/checkout/b2b/root';
import { checkoutTranslationChunksConfig, checkoutTranslationsDe, checkoutTranslationsEn } from '@spartacus/checkout/base/assets';
import { CHECKOUT_FEATURE, CheckoutRootModule } from '@spartacus/checkout/base/root';
import {
  checkoutScheduledReplenishmentTranslationChunksConfig,
  checkoutScheduledReplenishmentTranslationsDe,
  checkoutScheduledReplenishmentTranslationsEn,
} from '@spartacus/checkout/scheduled-replenishment/assets';
import { CheckoutScheduledReplenishmentRootModule } from '@spartacus/checkout/scheduled-replenishment/root';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';

@NgModule({
  declarations: [],
  imports: [CheckoutRootModule, CheckoutB2BRootModule, CheckoutScheduledReplenishmentRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [CHECKOUT_FEATURE]: {
          module: () => import('./checkout-wrapper.module').then((m) => m.CheckoutWrapperModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: checkoutTranslationsEn, de: checkoutTranslationsDe },
        chunks: checkoutTranslationChunksConfig,
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: checkoutB2BTranslationsEn, de: checkoutB2BTranslationsDe },
        chunks: checkoutB2BTranslationChunksConfig,
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: checkoutScheduledReplenishmentTranslationsEn, de: checkoutScheduledReplenishmentTranslationsDe },
        chunks: checkoutScheduledReplenishmentTranslationChunksConfig,
      },
    }),
  ],
})
export class CheckoutFeatureModule {}
