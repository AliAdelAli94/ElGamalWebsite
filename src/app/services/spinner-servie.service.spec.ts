import { TestBed } from '@angular/core/testing';

import { SpinnerServieService } from './spinner-servie.service';

describe('SpinnerServieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpinnerServieService = TestBed.get(SpinnerServieService);
    expect(service).toBeTruthy();
  });
});
