import { environment } from '../../../../environments/environment';
import { ContentfulConfig } from './contentful-config';

export const defaultContentfulConfig: ContentfulConfig = {
  contentful: {
    spaceId: environment.contentful.spaceId,
    accessToken: environment.contentful.accessToken,
    previewAccessToken: environment.contentful.previewAccessToken,
    environment: environment.contentful.environment,
    deliveryApiUrl: environment.contentful.deliveryApiUrl,
    previewApiUrl: environment.contentful.previewApiUrl,
  },
};
