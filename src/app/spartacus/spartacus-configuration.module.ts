import { NgModule } from '@angular/core';

import { translationChunksConfig, translations } from '@spartacus/assets';
import { FeaturesConfig, I18nConfig, OccConfig, SiteContextConfig, provideConfig, provideDefaultConfig } from '@spartacus/core';
import { defaultB2bOccConfig } from '@spartacus/setup';
import { defaultCmsContentProviders, layoutConfig, mediaConfig } from '@spartacus/storefront';

import { environment } from '../../environments/environment';
import { ContentfulConfig } from '../contentful/root/config/contentful-config';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    provideConfig(layoutConfig),
    provideConfig(mediaConfig),
    ...defaultCmsContentProviders,
    provideConfig(<OccConfig>{
      backend: {
        occ: {
          baseUrl: environment.baseUrl,
          prefix: '/occ/v2/',
        },
      },
    }),
    provideConfig(<SiteContextConfig>{
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: ['powertools-spa'],
        currency: ['USD', 'EUR'],
        language: ['en', 'de'],
      },
    }),
    provideDefaultConfig(<I18nConfig>{
      i18n: {
        resources: translations,
        chunks: {
          ...translationChunksConfig,
          myAccount: ['closeAccount', 'updatePasswordForm', 'updateProfileForm', 'consentManagementForm', 'myCoupons', 'notificationPreference', 'myInterests'],
        },
        fallbackLang: 'en',
      },
    }),
    provideConfig(<FeaturesConfig>{
      features: {
        level: '2211.43',
      },
    }),
    provideConfig(<ContentfulConfig>{
      contentful: {
        spaceId: environment.contentful.spaceId,
        accessToken: environment.contentful.accessToken,
        previewAccessToken: environment.contentful.previewAccessToken,
        environment: environment.contentful.environment,
        deliveryApiUrl: environment.contentful.deliveryApiUrl,
        previewApiUrl: environment.contentful.previewApiUrl,
        slugMapping: {
          '^organization/units/[a-zA-Z0-9]+$': 'organization/units',
          '^organization/account-summary/details/[a-zA-Z0-9]+$': 'organization/account-summary/details',
          '^my-account/saved-cart/[a-zA-Z0-9]+$': 'my-account/saved-cart',
          '^my-account/order/[a-zA-Z0-9]+$': 'my-account/order',
          '^my-account/order/cancel/confirmation/[a-zA-Z0-9]+$': 'my-account/order/cancel/confirmation',
          '^my-account/order/cancel/[a-zA-Z0-9]+$': 'my-account/order/cancel',
          '^my-account/support-ticket/[a-zA-Z0-9]+$': 'my-account/support-ticket',
          '^my-account/unitLevelOrderDetails/[a-zA-Z0-9]+$': 'my-account/unitLevelOrderDetails',
          '^my-account/order/return/confirmation/[a-zA-Z0-9]+$': 'my-account/order/return/confirmation',
          '^my-account/order/return/[a-zA-Z0-9]+$': 'my-account/order/return',
          '^my-account/return-request/[a-zA-Z0-9]+$': 'my-account/return-request',
          '^my-account/quote/[a-zA-Z0-9]+$': 'my-account/quote',
        },
      },
    }),
    provideConfig(defaultB2bOccConfig),
  ],
})
export class SpartacusConfigurationModule {}
