import { TestBed } from '@angular/core/testing';

import { SupportAdminService } from './support-admin.service';

describe('SupportAdminService', () => {
  let service: SupportAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
