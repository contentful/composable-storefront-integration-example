import { Provider } from '@angular/core';

import { ComponentDecorator } from '@spartacus/core';

import { ContentfulComponentDecorator } from './contentful-component-decorator';

export const contentfulDecorators: Provider[] = [
  {
    provide: ComponentDecorator,
    useExisting: ContentfulComponentDecorator,
    multi: true,
  },
];
