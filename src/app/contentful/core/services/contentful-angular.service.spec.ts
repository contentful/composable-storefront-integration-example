import { TestBed } from '@angular/core/testing';
import { ContentfulLivePreview, ContentfulLivePreviewInitConfig, LivePreviewProps } from '@contentful/live-preview';
import { InspectorModeDataAttributes, InspectorModeTags } from '@contentful/live-preview/dist/inspectorMode/types';

import { ContentfulAngularService } from './contentful-angular.service';

describe('ContentfulAngularService', () => {
  let service: ContentfulAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentfulAngularService],
    });
    service = TestBed.inject(ContentfulAngularService);
    spyOn(ContentfulLivePreview, 'init');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('init', () => {
    it('should initialize ContentfulLivePreview with the given config', () => {
      const config: ContentfulLivePreviewInitConfig = {
        locale: 'en',
        space: 'spaceId',
        environment: 'env',
        debugMode: true,
        enableInspectorMode: true,
        enableLiveUpdates: true,
        targetOrigin: 'http://localhost',
        experimental: { ignoreManuallyTaggedElements: false },
      };

      service.init(config);

      expect(ContentfulLivePreview.init).toHaveBeenCalledWith(config);
    });
  });

  describe('getInspectorModeTags', () => {
    it('should return inspector mode tags if enableInspectorMode is true', () => {
      const config: LivePreviewProps = { entryId: 'entryId', fieldId: 'fieldId' };
      const tags: InspectorModeTags = { [InspectorModeDataAttributes.ENTRY_ID]: 'entryId', [InspectorModeDataAttributes.FIELD_ID]: 'fieldId' };

      service.init({ enableInspectorMode: true, locale: 'en-US' });
      spyOn(ContentfulLivePreview, 'getProps').and.returnValue(tags);

      const result = service.getInspectorModeTags(config);

      expect(result).toEqual(tags);
    });

    it('should return null if enableInspectorMode is false', () => {
      const config: LivePreviewProps = { entryId: 'entryId', fieldId: 'fieldId' };

      service.init({ enableInspectorMode: false, locale: 'en-US' });

      const result = service.getInspectorModeTags(config);

      expect(result).toBeNull();
    });
  });

  describe('activateLiveUpdates', () => {
    it('should subscribe to live updates if data is valid', () => {
      const data = { some: 'data' };
      const callback = jasmine.createSpy('callback');
      const unsubscribe = jasmine.createSpy('unsubscribe');

      service.init({ enableLiveUpdates: true, locale: 'en-US' });
      spyOn(ContentfulLivePreview, 'subscribe').and.returnValue(unsubscribe);

      const result = service.activateLiveUpdates(data, callback);

      expect(ContentfulLivePreview.subscribe).toHaveBeenCalledWith('edit', {
        data,
        locale: undefined,
        callback,
      });
      expect(result).toBe(unsubscribe);
    });

    it('should subscribe to live updates if data is a non-empty array', () => {
      const data = [1];
      const callback = jasmine.createSpy('callback');
      const unsubscribe = jasmine.createSpy('unsubscribe');

      spyOn(ContentfulLivePreview, 'subscribe').and.returnValue(unsubscribe);
      service.init({ enableLiveUpdates: true, locale: 'en-US' });

      const result = service.activateLiveUpdates(data, callback);

      expect(ContentfulLivePreview.subscribe).toHaveBeenCalledWith('edit', {
        data,
        locale: undefined,
        callback,
      });
      expect(result).toBe(unsubscribe);
    });

    it('should subscribe to live updates with locale', () => {
      const data = { some: 'data' };
      const callback = jasmine.createSpy('callback');
      const unsubscribe = jasmine.createSpy('unsubscribe');

      spyOn(ContentfulLivePreview, 'subscribe').and.returnValue(unsubscribe);
      service.init({ enableLiveUpdates: true, locale: 'en-US' });

      const result = service.activateLiveUpdates(data, callback, 'en-US');

      expect(ContentfulLivePreview.subscribe).toHaveBeenCalledWith('edit', {
        data,
        locale: 'en-US',
        callback,
      });
      expect(result).toBe(unsubscribe);
    });

    it('should subscribe to live updates with options object', () => {
      const data = { some: 'data' };
      const callback = jasmine.createSpy('callback');
      const unsubscribe = jasmine.createSpy('unsubscribe');

      spyOn(ContentfulLivePreview, 'subscribe').and.returnValue(unsubscribe);
      service.init({ enableLiveUpdates: true, locale: 'en-US' });

      const result = service.activateLiveUpdates(data, callback, { locale: 'en-US' });

      expect(ContentfulLivePreview.subscribe).toHaveBeenCalledWith('edit', {
        data,
        locale: 'en-US',
        callback,
      });
      expect(result).toBe(unsubscribe);
    });

    it('should not subscribe to live updates if live updates are disabled', () => {
      const data = {};
      const callback = jasmine.createSpy('callback');

      service.init({ enableLiveUpdates: false, locale: 'en-US' });
      spyOn(ContentfulLivePreview, 'subscribe');

      const result = service.activateLiveUpdates(data, callback);

      expect(ContentfulLivePreview.subscribe).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    it('should not subscribe to live updates if data is invalid', () => {
      const data = {};
      const callback = jasmine.createSpy('callback');

      service.init({ enableLiveUpdates: true, locale: 'en-US' });
      spyOn(ContentfulLivePreview, 'subscribe');

      const result = service.activateLiveUpdates(data, callback);

      expect(ContentfulLivePreview.subscribe).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    it('should not subscribe to live updates if data is an empty array', () => {
      const data: unknown[] = [];
      const callback = jasmine.createSpy('callback');

      service.init({ enableLiveUpdates: true, locale: 'en-US' });
      spyOn(ContentfulLivePreview, 'subscribe');

      const result = service.activateLiveUpdates(data, callback);

      expect(ContentfulLivePreview.subscribe).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    it('should not subscribe to live updates if data is an empty object', () => {
      const data = {};
      const callback = jasmine.createSpy('callback');

      service.init({ enableLiveUpdates: true, locale: 'en-US' });
      spyOn(ContentfulLivePreview, 'subscribe');

      const result = service.activateLiveUpdates(data, callback);

      expect(ContentfulLivePreview.subscribe).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});
