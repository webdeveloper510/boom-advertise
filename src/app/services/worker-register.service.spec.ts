import { TestBed } from '@angular/core/testing';

import { WorkerRegisterService } from './worker-register.service';

describe('WorkerRegisterService', () => {
  let service: WorkerRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
