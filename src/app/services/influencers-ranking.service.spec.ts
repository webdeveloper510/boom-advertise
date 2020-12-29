import { TestBed } from '@angular/core/testing';

import { InfluencersRankingService } from './influencers-ranking.service';

describe('InfluencersRankingService', () => {
  let service: InfluencersRankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfluencersRankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
