import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

@Component({
  selector: 'cx-storefront',
  template: '',
  standalone: false,
})
class MockCxStorefrontComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, MockCxStorefrontComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
