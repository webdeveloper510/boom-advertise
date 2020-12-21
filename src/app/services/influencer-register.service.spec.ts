import { TestBed } from '@angular/core/testing';

import { InfluencerRegisterService } from './influencer-register.service';

describe('InfluencerRegisterService', () => {
  let service: InfluencerRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfluencerRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
