import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInfluencersComponent } from './all-influencers.component';

describe('AllInfluencersComponent', () => {
  let component: AllInfluencersComponent;
  let fixture: ComponentFixture<AllInfluencersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllInfluencersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInfluencersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
