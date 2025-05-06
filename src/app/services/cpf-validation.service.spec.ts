import { TestBed } from '@angular/core/testing';

import { CpfValidationService } from './cpf-validation.service';

describe('CpfValidationService', () => {
  let service: CpfValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpfValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
