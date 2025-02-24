import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgZone, Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InspectorModeDataAttributes } from '@contentful/live-preview/dist/inspectorMode/types';
import { Store, StoreModule } from '@ngrx/store';

import { CmsActions, ContentSlotComponentData, ConverterService, LanguageService, PageContext, RoutingService } from '@spartacus/core';

import { of } from 'rxjs';

import { ContentfulConfig } from '../../root/config/contentful-config';
import { ContentfulAngularService } from './contentful-angular.service';
import { ContentfulLivePreviewService } from './contentful-live-preview.service';

describe('ContentfulLivePreviewService', () => {
  let service: ContentfulLivePreviewService;
  let contentfulAngularService: jasmine.SpyObj<ContentfulAngularService>;
  let routingService: jasmine.SpyObj<RoutingService>;
  let converterService: jasmine.SpyObj<ConverterService>;
  let renderer: Renderer2;
  let storeSpy: jasmine.SpyObj<Store>;

  const locale = 'en';

  beforeEach(() => {
    const contentfulAngularServiceSpy = jasmine.createSpyObj('ContentfulAngularService', ['init', 'getInspectorModeTags', 'activateLiveUpdates']);
    const routingServiceSpy = jasmine.createSpyObj('RoutingService', ['getPageContext']);
    const converterServiceSpy = jasmine.createSpyObj('ConverterService', ['convert']);
    storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: ContentfulAngularService, useValue: contentfulAngularServiceSpy },
        {
          provide: ContentfulConfig,
          useValue: {
            'init': jasmine.createSpy(),
          },
        },
        { provide: NgZone, useValue: new NgZone({}) },
        {
          provide: LanguageService,
          useValue: {
            getActive: () => of(locale),
          },
        },
        { provide: RoutingService, useValue: routingServiceSpy },
        { provide: ConverterService, useValue: converterServiceSpy },
        { provide: Store, useValue: storeSpy },
      ],
    });
    service = TestBed.inject(ContentfulLivePreviewService);
    contentfulAngularService = TestBed.inject(ContentfulAngularService) as jasmine.SpyObj<ContentfulAngularService>;
    routingService = TestBed.inject(RoutingService) as jasmine.SpyObj<RoutingService>;
    converterService = TestBed.inject(ConverterService) as jasmine.SpyObj<ConverterService>;

    const rendererFactory = TestBed.inject(RendererFactory2);
    renderer = rendererFactory.createRenderer(null, null);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize ContentfulAngularService with language', () => {
    expect(contentfulAngularService.init).toHaveBeenCalledWith({
      locale: locale,
      enableInspectorMode: true,
      enableLiveUpdates: true,
      debugMode: jasmine.any(Boolean),
    });
  });

  describe('hasInspectorModeTags', () => {
    it('should return true if element has inspector mode tags', () => {
      const element = document.createElement('div');
      element.setAttribute(InspectorModeDataAttributes.FIELD_ID, 'fieldId');
      expect(service.hasInspectorModeTags(element)).toBeTrue();
    });

    it('should return false if element does not have inspector mode tags', () => {
      const element = document.createElement('div');
      expect(service.hasInspectorModeTags(element)).toBeFalse();
    });
  });

  describe('addInspectorModeTags', () => {
    it('should add inspector mode tags to element', () => {
      const element = document.createElement('div');
      const component: ContentSlotComponentData = { uid: 'uid', flexType: 'flexType' };
      const tags = { [InspectorModeDataAttributes.ENTRY_ID]: 'uid', [InspectorModeDataAttributes.FIELD_ID]: 'flexType' };

      contentfulAngularService.getInspectorModeTags.and.returnValue(tags);
      service.addInspectorModeTags(element, renderer, component);

      expect(element.getAttribute(InspectorModeDataAttributes.FIELD_ID)).toBe('flexType');
      expect(element.getAttribute(InspectorModeDataAttributes.ENTRY_ID)).toBe('uid');
    });

    it('should add inspector mode tags to element for empty entry and field ids', () => {
      const element = document.createElement('div');
      const component: ContentSlotComponentData = {};

      service.addInspectorModeTags(element, renderer, component);

      expect(element.getAttribute(InspectorModeDataAttributes.FIELD_ID)).toBe('');
      expect(element.getAttribute(InspectorModeDataAttributes.ENTRY_ID)).toBe('');
    });

    it('should not add inspector mode tags to element if inspector mode is disabled', () => {
      const element = document.createElement('div');
      const component: ContentSlotComponentData = { uid: 'uid', flexType: 'flexType' };

      contentfulAngularService.getInspectorModeTags.and.returnValue(null);
      service.addInspectorModeTags(element, renderer, component);

      expect(element.getAttribute(InspectorModeDataAttributes.FIELD_ID)).toBe('');
      expect(element.getAttribute(InspectorModeDataAttributes.ENTRY_ID)).toBe('');
    });
  });

  describe('initComponentLiveUpdate', () => {
    it('should subscribe to live updates if component has uid', () => {
      const component: ContentSlotComponentData = { uid: 'uid', properties: { data: { 'sys.id': 'testId' } } };
      const pageContext: PageContext = { id: 'pageId' };
      const unsubscribe = jasmine.createSpy('unsubscribe');

      contentfulAngularService.activateLiveUpdates.and.returnValue(unsubscribe);
      converterService.convert.and.returnValue(component);
      routingService.getPageContext.and.returnValue(of(pageContext));
      service.initComponentLiveUpdate(component);

      expect(contentfulAngularService.activateLiveUpdates).toHaveBeenCalledWith({ 'sys.id': 'testId' }, jasmine.any(Function));
      expect(service.liveUpdateSubscriptions.get('uid')).toBe(unsubscribe);
    });

    it('should not subscribe to live updates if component does not have uid', () => {
      const component: ContentSlotComponentData = { properties: { data: 'data' } };
      service.initComponentLiveUpdate(component);

      expect(contentfulAngularService.activateLiveUpdates).not.toHaveBeenCalled();
    });
  });

  describe('updateCmsComponent', () => {
    it('should convert component data and dispatch action when uid exists', () => {
      const updatedComponentData = { id: 'test-id' }; // Mock input
      const convertedComponent = { uid: 'test-uid' }; // Mock output of convert
      const mockPageContext = { id: 'homepage' }; // Mock page context

      converterService.convert.and.returnValue(convertedComponent);
      routingService.getPageContext.and.returnValue(of(mockPageContext));

      service['updateCmsComponent'](updatedComponentData);

      expect(converterService.convert).toHaveBeenCalledWith(updatedComponentData, jasmine.any(Object));
      expect(routingService.getPageContext).toHaveBeenCalled();
      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        new CmsActions.LoadCmsComponentSuccess({
          component: convertedComponent,
          uid: 'test-uid',
          pageContext: mockPageContext,
        }),
      );
    });
  });
});
