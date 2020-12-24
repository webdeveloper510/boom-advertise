import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcustomComponent } from './formcustom.component';

describe('FormcustomComponent', () => {
  let component: FormcustomComponent;
  let fixture: ComponentFixture<FormcustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormcustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormcustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
