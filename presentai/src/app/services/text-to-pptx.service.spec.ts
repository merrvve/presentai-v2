import { TestBed } from '@angular/core/testing';

import { TextToPptxService } from './text-to-pptx.service';

describe('TextToPptxService', () => {
  let service: TextToPptxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextToPptxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
