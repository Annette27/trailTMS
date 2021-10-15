import { TestBed } from '@angular/core/testing';

import { ApplistService } from './applist.service';

describe('ApplistService', () => {
  let service: ApplistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
