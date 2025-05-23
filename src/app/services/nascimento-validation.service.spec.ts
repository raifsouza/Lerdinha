import { TestBed } from '@angular/core/testing';

import { NascimentoValidationService } from './nascimento-validation.service';

describe('NascimentoValidationService', () => {
  let service: NascimentoValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NascimentoValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
