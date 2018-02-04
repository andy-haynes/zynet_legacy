import { TestBed, inject } from '@angular/core/testing';

import { BrewConfigService } from './brew-config.service';

describe('BrewConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrewConfigService]
    });
  });

  it('should be created', inject([BrewConfigService], (service: BrewConfigService) => {
    expect(service).toBeTruthy();
  }));
});
