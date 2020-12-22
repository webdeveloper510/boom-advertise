import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersRegisterComponent } from './workers-register.component';

describe('WorkersRegisterComponent', () => {
  let component: WorkersRegisterComponent;
  let fixture: ComponentFixture<WorkersRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkersRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
