import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestpaycustomComponent } from './testpaycustom.component';

describe('TestpaycustomComponent', () => {
  let component: TestpaycustomComponent;
  let fixture: ComponentFixture<TestpaycustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestpaycustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestpaycustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
