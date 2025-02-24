import { Injectable } from '@angular/core';

import { CMS_COMPONENT_NORMALIZER, CmsComponent, CmsComponentAdapter, ConverterService, LanguageService } from '@spartacus/core';

import { map } from 'rxjs/operators';

import { Entry } from 'contentful';
import { Observable, switchMap } from 'rxjs';

import { ComponentSkeleton } from '../../core/content-types';
import { ContentService } from '../../core/services/contentful.service';

export interface ContentfulCmsComponentRequest {
  componentType?: string;
  componentIds?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ContentfulCmsComponentAdapter implements CmsComponentAdapter {
  constructor(
    protected converter: ConverterService,
    protected contentService: ContentService,
    protected languageService: LanguageService,
  ) {}

  load<T extends CmsComponent>(id: string): Observable<T> {
    return this.languageService.getActive().pipe(
      switchMap((language) =>
        this.contentService.getComponents({ componentIds: [id] }, language).pipe(
          map((componentsEntries) => componentsEntries.items[0]),
          this.converter.pipeable<Entry<ComponentSkeleton, undefined, string>, T>(CMS_COMPONENT_NORMALIZER),
        ),
      ),
    );
  }

  findComponentsByIds(ids: string[]): Observable<CmsComponent[]> {
    return this.languageService.getActive().pipe(
      switchMap((language) =>
        this.contentService.getComponents({ componentIds: ids }, language).pipe(
          map((componentsEntries) => componentsEntries.items),
          this.converter.pipeableMany(CMS_COMPONENT_NORMALIZER),
        ),
      ),
    );
  }
}
