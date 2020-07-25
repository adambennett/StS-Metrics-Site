import { TestBed } from '@angular/core/testing';

import { DisplayObjectService } from './display-object.service';

describe('DisplayObjectServiceService', () => {
  let service: DisplayObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
