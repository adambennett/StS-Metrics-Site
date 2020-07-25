import { TestBed } from '@angular/core/testing';

import { RunLogService } from './run-log.service';

describe('RunLogServiceService', () => {
  let service: RunLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
