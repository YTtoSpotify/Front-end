import { TestBed } from '@angular/core/testing';

import { SpinnersService } from './spinners.service';

describe('SpinnersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpinnersService = TestBed.get(SpinnersService);
    expect(service).toBeTruthy();
  });
});
