import { translationChunksConfig } from '@spartacus/assets';
import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { orderTranslationChunksConfig } from '@spartacus/order/assets';

import { de } from './de';
import { en } from './en';

export const contentfulTranslations: TranslationResources = {
  en,
  de,
};

export const contentfulTranslationChunksConfig: TranslationChunksConfig = {
  product: [...translationChunksConfig['product'], '14QaYVMY2vuPfKSwrGgOKO'],
  order: [...orderTranslationChunksConfig['order'], '6ApUVJOYpbKBiUG16o8QoU'],
};
