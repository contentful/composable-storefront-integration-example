import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const environment = {
  production: false,
  baseUrl: 'https://localhost:9002',
  contentful: {
    spaceId: 'YOUR_SPACE_ID',
    accessToken: 'YOUR_DELIVERY_API_TOKEN',
    previewAccessToken: 'YOUR_PREVIEW_API_TOKEN',
    environment: 'master',
    deliveryApiUrl: 'cdn.contentful.com',
    previewApiUrl: 'preview.contentful.com',
  },
};

export const externalModules = [
  StoreDevtoolsModule.instrument({
    maxAge: 25,
  }),
];
