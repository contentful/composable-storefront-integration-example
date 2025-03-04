import { TestBed } from '@angular/core/testing';

import { CMS_COMPONENT_NORMALIZER, CmsComponent, ConverterService, LanguageService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';

import { of } from 'rxjs';

import { RestrictionsService } from '../../core/services/contentful-restrictions.service';
import { ContentService } from '../../core/services/contentful.service';
import { ContentfulCmsComponentAdapter } from './contentful-cms-component.adapter';

describe('ContentfulCmsComponentAdapter', () => {
  let service: ContentfulCmsComponentAdapter;
  let mockContentService: jasmine.SpyObj<ContentService>;
  let mockLanguageService: jasmine.SpyObj<LanguageService>;
  let mockRestrictionsService: jasmine.SpyObj<RestrictionsService>;
  let mockUserAccountService: jasmine.SpyObj<UserAccountFacade>;
  let converterService: ConverterService;

  beforeEach(() => {
    mockContentService = jasmine.createSpyObj('ContentService', ['getComponents']);
    mockLanguageService = jasmine.createSpyObj('LanguageService', ['getActive']);
    mockLanguageService.getActive.and.returnValue(of('en'));
    mockRestrictionsService = jasmine.createSpyObj('RestrictionsService', ['setUserPermissions']);
    mockUserAccountService = jasmine.createSpyObj('UserAccountFacade', ['get']);
    mockUserAccountService.get.and.returnValue(of(undefined));

    TestBed.configureTestingModule({
      providers: [
        ContentfulCmsComponentAdapter,
        { provide: ContentService, useValue: mockContentService },
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: RestrictionsService, useValue: mockRestrictionsService },
        { provide: UserAccountFacade, useValue: mockUserAccountService },
      ],
    });

    service = TestBed.inject(ContentfulCmsComponentAdapter);

    converterService = TestBed.inject(ConverterService);
    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(converterService, 'pipeableMany').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load', () => {
    it('should pass correct params to contentService.getComponents', () => {
      const mockComponentId = 'test-component';
      const mockComponent = { id: mockComponentId } as CmsComponent;

      mockContentService.getComponents.and.returnValue(of({ items: [mockComponent] } as any));

      service.load(mockComponentId).subscribe();

      expect(mockContentService.getComponents).toHaveBeenCalledWith({ componentIds: [mockComponentId] }, 'en');
      expect(converterService.pipeable).toHaveBeenCalledWith(CMS_COMPONENT_NORMALIZER);
    });
  });

  describe('findComponentsByIds', () => {
    it('should pass correct params to contentService.getComponents for multiple components', () => {
      const mockComponentIds = ['component1', 'component2'];
      const mockComponents = [{ id: 'component1' } as CmsComponent, { id: 'component2' } as CmsComponent];

      mockContentService.getComponents.and.returnValue(of({ items: mockComponents } as any));

      service.findComponentsByIds(mockComponentIds).subscribe();

      expect(mockContentService.getComponents).toHaveBeenCalledWith({ componentIds: mockComponentIds }, 'en');
      expect(converterService.pipeableMany).toHaveBeenCalledWith(CMS_COMPONENT_NORMALIZER);
    });
  });
});
