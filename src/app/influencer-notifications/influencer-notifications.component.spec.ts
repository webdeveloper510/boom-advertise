import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerNotificationsComponent } from './influencer-notifications.component';

describe('InfluencerNotificationsComponent', () => {
  let component: InfluencerNotificationsComponent;
  let fixture: ComponentFixture<InfluencerNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencerNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
