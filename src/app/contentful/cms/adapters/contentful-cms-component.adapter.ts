import { Injectable } from '@angular/core';

import { CMS_COMPONENT_NORMALIZER, CmsComponent, CmsComponentAdapter, ConverterService, LanguageService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';

import { map } from 'rxjs/operators';

import { Entry } from 'contentful';
import { Observable, combineLatest, switchMap } from 'rxjs';

import { ComponentSkeleton } from '../../core/content-types';
import { RestrictionsService } from '../../core/services/contentful-restrictions.service';
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
    protected restrictionService: RestrictionsService,
    protected languageService: LanguageService,
    protected userAccount: UserAccountFacade,
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
    return combineLatest([this.languageService.getActive(), this.userAccount.get()]).pipe(
      switchMap(([language, user]) => {
        this.restrictionService.setUserPermissions(user);
        return this.contentService.getComponents({ componentIds: ids }, language).pipe(
          map((componentsEntries) => componentsEntries.items),
          this.converter.pipeableMany(CMS_COMPONENT_NORMALIZER),
        );
      }),
    );
  }
}
