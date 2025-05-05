import { TestBed } from '@angular/core/testing';

import { ConverterService, LanguageService, PageContext, PageType } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';

import { Entry } from 'contentful';
import { of } from 'rxjs';

import { PageSkeleton } from '../../core/content-types';
import { RestrictionsService } from '../../core/services/contentful-restrictions.service';
import { ContentService } from '../../core/services/contentful.service';
import { ContentfulCmsPageAdapter } from './contentful-cms-page.adapter';

const homepagePageContext: PageContext = {
  id: 'homepage',
  type: PageType.CONTENT_PAGE,
};

const smarteditPageContext: PageContext = {
  id: 'smartedit-preview',
  type: PageType.CONTENT_PAGE,
};

const catalogPageContext: PageContext = {
  id: '',
  type: PageType.CATALOG_PAGE,
};

const categoryPageContext: PageContext = {
  id: '1358',
  type: PageType.CATALOG_PAGE,
};

const contentPageContext: PageContext = {
  id: 'content/test',
  type: PageType.CONTENT_PAGE,
};

const productPageContext: PageContext = {
  id: '3755219',
  type: PageType.PRODUCT_PAGE,
};

const undefinedPageContext: PageContext = {
  id: '',
  type: undefined,
};

describe('ContentfulCmsPageAdapter', () => {
  let adapter: ContentfulCmsPageAdapter;
  let mockContentService: jasmine.SpyObj<ContentService>;
  let mockLanguageService: jasmine.SpyObj<LanguageService>;
  let mockRestrictionsService: jasmine.SpyObj<RestrictionsService>;
  let mockUserAccountService: jasmine.SpyObj<UserAccountFacade>;
  let converterService: ConverterService;

  beforeEach(() => {
    mockContentService = jasmine.createSpyObj('ContentService', ['getPage']);
    mockLanguageService = jasmine.createSpyObj('LanguageService', ['getActive']);
    mockRestrictionsService = jasmine.createSpyObj('RestrictionsService', ['setUserPermissions']);
    mockUserAccountService = jasmine.createSpyObj('UserAccountFacade', ['get']);
    mockUserAccountService.get.and.returnValue(of(undefined));

    TestBed.configureTestingModule({
      providers: [
        ContentfulCmsPageAdapter,
        { provide: ContentService, useValue: mockContentService },
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: RestrictionsService, useValue: mockRestrictionsService },
        { provide: UserAccountFacade, useValue: mockUserAccountService },
      ],
    });

    adapter = TestBed.inject(ContentfulCmsPageAdapter);

    converterService = TestBed.inject(ConverterService);
    mockContentService = TestBed.inject(ContentService) as jasmine.SpyObj<ContentService>;
    mockLanguageService = TestBed.inject(LanguageService) as jasmine.SpyObj<LanguageService>;

    spyOn(converterService, 'pipeable').and.callThrough();
    mockContentService.getPage.and.returnValue(of({} as Entry<PageSkeleton, undefined, string>));
    mockLanguageService.getActive.and.returnValue(of('en'));
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  describe('load', () => {
    it('should pass correct params for homepage context', (done) => {
      adapter.load(homepagePageContext).subscribe(() => {
        expect(mockContentService.getPage).toHaveBeenCalledWith({ pageSlug: 'homepage' }, 'en');
        done();
      });
    });

    it('should pass correct params for catalog context', (done) => {
      adapter.load(catalogPageContext).subscribe(() => {
        expect(mockContentService.getPage).toHaveBeenCalledWith({ pageSlug: 'catalog' }, 'en');
        done();
      });
    });

    it('should pass correct params for category context', (done) => {
      adapter.load(categoryPageContext).subscribe(() => {
        expect(mockContentService.getPage).toHaveBeenCalledWith({ pageSlug: 'catalog' }, 'en');
        done();
      });
    });

    it('should pass correct params for content context', (done) => {
      adapter.load(contentPageContext).subscribe(() => {
        expect(mockContentService.getPage).toHaveBeenCalledWith({ pageSlug: 'test' }, 'en');
        done();
      });
    });

    it('should pass correct params for product context', (done) => {
      adapter.load(productPageContext).subscribe(() => {
        expect(mockContentService.getPage).toHaveBeenCalledWith({ pageSlug: 'product' }, 'en');
        done();
      });
    });

    it('should pass correct params for smartedit context', (done) => {
      adapter.load(smarteditPageContext).subscribe(() => {
        expect(mockContentService.getPage).toHaveBeenCalledWith({ pageSlug: 'homepage' }, 'en');
        done();
      });
    });

    it('should return empty params for undefined context', (done) => {
      adapter.load(undefinedPageContext).subscribe(() => {
        expect(mockContentService.getPage).toHaveBeenCalledWith({}, 'en');
        done();
      });
    });
  });
});
