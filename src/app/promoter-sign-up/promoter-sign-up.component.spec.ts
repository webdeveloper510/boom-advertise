import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterSignUpComponent } from './promoter-sign-up.component';

describe('PromoterSignUpComponent', () => {
  let component: PromoterSignUpComponent;
  let fixture: ComponentFixture<PromoterSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoterSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoterSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
