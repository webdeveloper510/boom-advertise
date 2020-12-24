import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerSignupComponent } from './influencer-signup.component';

describe('InfluencerSignupComponent', () => {
  let component: InfluencerSignupComponent;
  let fixture: ComponentFixture<InfluencerSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencerSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
