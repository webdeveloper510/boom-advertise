import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAuthenticInfluencersRankingComponent } from './top-authentic-influencers-ranking.component';

describe('TopAuthenticInfluencersRankingComponent', () => {
  let component: TopAuthenticInfluencersRankingComponent;
  let fixture: ComponentFixture<TopAuthenticInfluencersRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopAuthenticInfluencersRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAuthenticInfluencersRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
