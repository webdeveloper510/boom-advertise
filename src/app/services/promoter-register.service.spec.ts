import { TestBed } from '@angular/core/testing';

import { PromoterRegisterService } from './promoter-register.service';

describe('PromoterRegisterService', () => {
  let service: PromoterRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoterRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
