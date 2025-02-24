import { Injectable, Renderer2 } from '@angular/core';

import { ComponentDecorator, ContentSlotComponentData } from '@spartacus/core';

import { ContentfulLivePreviewService } from '../services/contentful-live-preview.service';

@Injectable({
  providedIn: 'root',
})
export class ContentfulComponentDecorator extends ComponentDecorator {
  constructor(protected contentfulLivePreviewService: ContentfulLivePreviewService) {
    super();
  }

  decorate(element: Element, renderer: Renderer2, component: ContentSlotComponentData): void {
    if (!component) {
      return;
    }

    if (!this.contentfulLivePreviewService.hasInspectorModeTags(element)) {
      this.contentfulLivePreviewService.addInspectorModeTags(element, renderer, component);
    }

    this.contentfulLivePreviewService.initComponentLiveUpdate(component);
  }
}
