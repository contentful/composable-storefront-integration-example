import { Injectable } from '@angular/core';

import { User } from '@spartacus/core';

import { Entry } from 'contentful';

@Injectable({
  providedIn: 'root',
})
export class RestrictionsService {
  private permissions: string[] = [];

  setUserPermissions(user: User | undefined) {
    this.permissions = this.extractPermissionsFromUser(user);
  }

  isEntryAccessible(entry: Entry): boolean {
    if (entry.metadata.tags.length === 0) {
      return true;
    }

    return !entry.metadata.tags.some((tag) => tag.sys.id.startsWith('_require-') && !this.permissions.includes(tag.sys.id));
  }

  private extractPermissionsFromUser(user: User | undefined): string[] {
    if (!user) {
      return ['_require-anonymous'];
    }

    return ['_require-login', ...(user.roles ?? []).map((role) => `_require-${role}`)];
  }
}
