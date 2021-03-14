import { TestBed } from '@angular/core/testing';

import { ApiPokemonServiceService } from './api-pokemon-service.service';

describe('ApiPokemonServiceService', () => {
  let service: ApiPokemonServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPokemonServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
