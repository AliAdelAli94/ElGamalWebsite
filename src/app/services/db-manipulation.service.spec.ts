import { TestBed } from '@angular/core/testing';

import { DbManipulationService } from './db-manipulation.service';

describe('DbManipulationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbManipulationService = TestBed.get(DbManipulationService);
    expect(service).toBeTruthy();
  });
});
