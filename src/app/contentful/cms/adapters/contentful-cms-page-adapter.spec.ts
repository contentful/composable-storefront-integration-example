import { TestBed } from '@angular/core/testing';

import { ConverterService, LanguageService, PageContext, PageType } from '@spartacus/core';

import { EntryCollection } from 'contentful';
import { of } from 'rxjs';

import { PageSkeleton } from '../../core/content-types';
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
  let converterService: ConverterService;

  beforeEach(() => {
    mockContentService = jasmine.createSpyObj('ContentService', ['getPages']);
    mockLanguageService = jasmine.createSpyObj('LanguageService', ['getActive']);

    TestBed.configureTestingModule({
      providers: [
        ContentfulCmsPageAdapter,
        { provide: ContentService, useValue: mockContentService },
        { provide: LanguageService, useValue: mockLanguageService },
      ],
    });

    adapter = TestBed.inject(ContentfulCmsPageAdapter);

    converterService = TestBed.inject(ConverterService);
    mockContentService = TestBed.inject(ContentService) as jasmine.SpyObj<ContentService>;
    mockLanguageService = TestBed.inject(LanguageService) as jasmine.SpyObj<LanguageService>;

    spyOn(converterService, 'pipeable').and.callThrough();
    mockContentService.getPages.and.returnValue(of({} as EntryCollection<PageSkeleton, undefined, string>));
    mockLanguageService.getActive.and.returnValue(of('en'));
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  describe('load', () => {
    it('should pass correct params for homepage context', (done) => {
      adapter.load(homepagePageContext).subscribe(() => {
        expect(mockContentService.getPages).toHaveBeenCalledWith({ pageSlug: 'homepage' }, 'en');
        done();
      });
    });

    it('should pass correct params for catalog context', (done) => {
      adapter.load(catalogPageContext).subscribe(() => {
        expect(mockContentService.getPages).toHaveBeenCalledWith({ pageSlug: 'catalog' }, 'en');
        done();
      });
    });

    it('should pass correct params for category context', (done) => {
      adapter.load(categoryPageContext).subscribe(() => {
        expect(mockContentService.getPages).toHaveBeenCalledWith({ pageSlug: 'catalog' }, 'en');
        done();
      });
    });

    it('should pass correct params for content context', (done) => {
      adapter.load(contentPageContext).subscribe(() => {
        expect(mockContentService.getPages).toHaveBeenCalledWith({ pageSlug: 'test' }, 'en');
        done();
      });
    });

    it('should pass correct params for product context', (done) => {
      adapter.load(productPageContext).subscribe(() => {
        expect(mockContentService.getPages).toHaveBeenCalledWith({ pageSlug: 'product' }, 'en');
        done();
      });
    });

    it('should pass correct params for smartedit context', (done) => {
      adapter.load(smarteditPageContext).subscribe(() => {
        expect(mockContentService.getPages).toHaveBeenCalledWith({ pageSlug: 'homepage' }, 'en');
        done();
      });
    });

    it('should return empty params for undefined context', (done) => {
      adapter.load(undefinedPageContext).subscribe(() => {
        expect(mockContentService.getPages).toHaveBeenCalledWith({}, 'en');
        done();
      });
    });
  });
});
