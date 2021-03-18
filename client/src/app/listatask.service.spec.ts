import { TestBed } from '@angular/core/testing';

import { ListataskService } from './listatask.service';

describe('ListataskService', () => {
  let service: ListataskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListataskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
