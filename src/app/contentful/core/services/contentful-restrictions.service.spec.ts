import { TestBed } from '@angular/core/testing';

import { User } from '@spartacus/core';

import { Entry } from 'contentful';

import { ComponentSkeleton } from '../content-types';
import { DeepPartial } from '../helpers';
import { RestrictionsService } from './contentful-restrictions.service';

const mockUserAccount: User = {
  roles: ['b2badministrator', 'b2bcustomer'],
};

const mockEntryNoTags: DeepPartial<Entry<ComponentSkeleton, undefined, string>> = {
  'metadata': {
    'tags': [],
  },
};

const mockEntryOtherTags: DeepPartial<Entry<ComponentSkeleton, undefined, string>> = {
  'metadata': {
    'tags': [
      {
        sys: { id: 'test' },
      },
    ],
  },
};

const mockEntryWithTags: DeepPartial<Entry<ComponentSkeleton, undefined, string>> = {
  'metadata': {
    'tags': [
      {
        sys: { id: '_require-login' },
      },
    ],
  },
};

describe('RestrictionsService', () => {
  let service: RestrictionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestrictionsService],
    });
    service = TestBed.inject(RestrictionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('validateEntry', () => {
    it('should return true for Entry with no tags', () => {
      expect(service.isEntryAccessible(mockEntryNoTags as Entry<ComponentSkeleton, undefined, string>)).toBeTrue();
    });

    it('should return true for Entry with non-require tags', () => {
      expect(service.isEntryAccessible(mockEntryOtherTags as Entry<ComponentSkeleton, undefined, string>)).toBeTrue();
    });

    it('should return true for Entry with tags whose name matches the role that was given to the user', () => {
      service.setUserPermissions(mockUserAccount);
      expect(service.isEntryAccessible(mockEntryWithTags as Entry<ComponentSkeleton, undefined, string>)).toBeTrue();
    });

    it('should return false for Entry with tags whose name doesnt match any of the roles that were given to the user', () => {
      expect(service.isEntryAccessible(mockEntryWithTags as Entry<ComponentSkeleton, undefined, string>)).toBeFalse();
    });
  });
});
