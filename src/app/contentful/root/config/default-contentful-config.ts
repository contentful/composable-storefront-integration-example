import { ContentfulConfig } from './contentful-config';

export const defaultContentfulConfig: ContentfulConfig = {
  contentful: {
    spaceId: 'YOUR_SPACE_ID',
    accessToken: 'YOUR_DELIVERY_API_TOKEN',
    previewAccessToken: 'YOUR_PREVIEW_API_TOKEN',
    environment: 'master',
    deliveryApiUrl: 'cdn.contentful.com',
    previewApiUrl: 'preview.contentful.com',
  },
};
