import { TestBed } from '@angular/core/testing';

import { ViewMapService } from './view-map.service';

describe('ViewMapService', () => {
  let service: ViewMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
