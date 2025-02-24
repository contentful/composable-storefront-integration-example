import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, Renderer2 } from '@angular/core';
import { InspectorModeDataAttributes, InspectorModeEntryTags } from '@contentful/live-preview/dist/inspectorMode/types';
import { Argument } from '@contentful/live-preview/dist/types';
import { Store } from '@ngrx/store';

import {
  CMS_COMPONENT_NORMALIZER,
  CmsActions,
  ContentSlotComponentData,
  ConverterService,
  LanguageService,
  PageContext,
  RoutingService,
  StateWithCms,
} from '@spartacus/core';

import { take } from 'rxjs/operators';

import { ContentfulConfig } from '../../root/config/contentful-config';
import { ContentfulAngularService } from './contentful-angular.service';

@Injectable({
  providedIn: 'root',
})
export class ContentfulLivePreviewService {
  liveUpdateSubscriptions = new Map<string, VoidFunction>();

  constructor(
    protected contentfulAngularService: ContentfulAngularService,
    protected config: ContentfulConfig,
    protected zone: NgZone,
    protected http: HttpClient,
    protected store: Store<StateWithCms>,
    protected converterService: ConverterService,
    protected routingService: RoutingService,
    protected languageService: LanguageService,
  ) {
    this.languageService.getActive().subscribe((language) =>
      contentfulAngularService.init({
        locale: language,
        enableInspectorMode: true,
        enableLiveUpdates: true,
        debugMode: true,
      }),
    );
  }

  public hasInspectorModeTags(element: Element): boolean {
    return element.hasAttribute(InspectorModeDataAttributes.FIELD_ID);
  }

  public addInspectorModeTags(element: Element, renderer: Renderer2, component: ContentSlotComponentData): void {
    const props = this.contentfulAngularService.getInspectorModeTags({
      entryId: component.uid ?? '',
      fieldId: component.flexType ?? '',
    }) as InspectorModeEntryTags;

    renderer.setAttribute(element, InspectorModeDataAttributes.FIELD_ID, props?.[InspectorModeDataAttributes.FIELD_ID] ?? '');
    renderer.setAttribute(element, InspectorModeDataAttributes.ENTRY_ID, props?.[InspectorModeDataAttributes.ENTRY_ID] ?? '');
  }

  public initComponentLiveUpdate(component: ContentSlotComponentData) {
    if (!component.uid) {
      return;
    }

    this.unsubscribeLiveUpdate(component.uid);

    const unsubscribe = this.contentfulAngularService.activateLiveUpdates(component.properties?.data, this.updateCmsComponent.bind(this));

    if (unsubscribe) {
      this.subscribeLiveUpdate(component.uid, unsubscribe);
    }
  }

  protected subscribeLiveUpdate(componentId: string, unsubscribe: VoidFunction) {
    this.liveUpdateSubscriptions.set(componentId, unsubscribe);
  }

  protected unsubscribeLiveUpdate(componentId: string) {
    const unsubscribe = this.liveUpdateSubscriptions.get(componentId);
    unsubscribe?.();
    this.liveUpdateSubscriptions.delete(componentId);
  }

  protected updateCmsComponent(updatedComponentData: Argument) {
    const component = this.converterService.convert(updatedComponentData, CMS_COMPONENT_NORMALIZER);

    if (component.uid) {
      this.routingService
        .getPageContext()
        .pipe(take(1))
        .subscribe((pageContext: PageContext) => {
          this.store.dispatch(
            new CmsActions.LoadCmsComponentSuccess({
              component,
              uid: component.uid,
              pageContext,
            }),
          );
        });
    }
  }
}
