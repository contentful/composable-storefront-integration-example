import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ContentSlotComponentData } from '@spartacus/core';

import { ContentfulLivePreviewService } from '../services/contentful-live-preview.service';
import { ContentfulComponentDecorator } from './contentful-component-decorator';

describe('ContentfulComponentDecorator', () => {
  let decorator: ContentfulComponentDecorator;
  let livePreviewService: jasmine.SpyObj<ContentfulLivePreviewService>;
  let renderer: jasmine.SpyObj<Renderer2>;
  let element: HTMLElement;
  let component: ContentSlotComponentData;

  beforeEach(() => {
    const livePreviewServiceSpy = jasmine.createSpyObj('ContentfulLivePreviewService', [
      'hasInspectorModeTags',
      'addInspectorModeTags',
      'initComponentLiveUpdate',
    ]);
    const rendererSpy = jasmine.createSpyObj('Renderer2', ['setAttribute']);

    TestBed.configureTestingModule({
      providers: [
        ContentfulComponentDecorator,
        { provide: ContentfulLivePreviewService, useValue: livePreviewServiceSpy },
        { provide: Renderer2, useValue: rendererSpy },
      ],
    });

    decorator = TestBed.inject(ContentfulComponentDecorator);
    livePreviewService = TestBed.inject(ContentfulLivePreviewService) as jasmine.SpyObj<ContentfulLivePreviewService>;
    renderer = TestBed.inject(Renderer2) as jasmine.SpyObj<Renderer2>;
    element = document.createElement('div');
    component = { uid: 'testComponent' } as ContentSlotComponentData;
  });

  it('should be created', () => {
    expect(decorator).toBeTruthy();
  });

  it('should not decorate if component is not provided', () => {
    decorator.decorate(element, renderer, null as any);
    expect(livePreviewService.hasInspectorModeTags).not.toHaveBeenCalled();
    expect(livePreviewService.addInspectorModeTags).not.toHaveBeenCalled();
    expect(livePreviewService.initComponentLiveUpdate).not.toHaveBeenCalled();
  });

  it('should add inspector mode tags if not present', () => {
    livePreviewService.hasInspectorModeTags.and.returnValue(false);

    decorator.decorate(element, renderer, component);

    expect(livePreviewService.hasInspectorModeTags).toHaveBeenCalledWith(element);
    expect(livePreviewService.addInspectorModeTags).toHaveBeenCalledWith(element, renderer, component);
    expect(livePreviewService.initComponentLiveUpdate).toHaveBeenCalledWith(component);
  });

  it('should not add inspector mode tags if already present', () => {
    livePreviewService.hasInspectorModeTags.and.returnValue(true);

    decorator.decorate(element, renderer, component);

    expect(livePreviewService.hasInspectorModeTags).toHaveBeenCalledWith(element);
    expect(livePreviewService.addInspectorModeTags).not.toHaveBeenCalled();
    expect(livePreviewService.initComponentLiveUpdate).toHaveBeenCalledWith(component);
  });
});
