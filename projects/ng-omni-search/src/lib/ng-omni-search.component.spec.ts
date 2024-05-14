import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgOmniSearchComponent } from './ng-omni-search.component';

describe('NgOmniSearchComponent', () => {
  let component: NgOmniSearchComponent;
  let fixture: ComponentFixture<NgOmniSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgOmniSearchComponent]
    });
    fixture = TestBed.createComponent(NgOmniSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
