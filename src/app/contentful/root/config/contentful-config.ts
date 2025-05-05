import { Injectable } from '@angular/core';

import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ContentfulConfig {
  contentful?: {
    spaceId?: string;
    accessToken?: string;
    previewAccessToken?: string;
    environment?: string;
    deliveryApiUrl?: string;
    previewApiUrl?: string;
    slugMapping?: {
      [key: string]: string;
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends ContentfulConfig {}
}
