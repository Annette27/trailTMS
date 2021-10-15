import { TestBed } from '@angular/core/testing';

import { NewapplistService } from './newapplist.service';

describe('NewapplistService', () => {
  let service: NewapplistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewapplistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
