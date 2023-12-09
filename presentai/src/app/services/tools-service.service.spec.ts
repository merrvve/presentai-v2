import { TestBed } from '@angular/core/testing';

import { ToolsServiceService } from './tools-service.service';

describe('ToolsServiceService', () => {
  let service: ToolsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
