import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterAccountComponent } from './promoter-account.component';

describe('PromoterAccountComponent', () => {
  let component: PromoterAccountComponent;
  let fixture: ComponentFixture<PromoterAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoterAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoterAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
