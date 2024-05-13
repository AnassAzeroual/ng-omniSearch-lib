import { TestBed } from '@angular/core/testing';

import { NgOmniSearchService } from './ng-omni-search.service';

describe('NgOmniSearchService', () => {
  let service: NgOmniSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgOmniSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
