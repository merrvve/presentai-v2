import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractpdfComponent } from './extractpdf.component';

describe('ExtractpdfComponent', () => {
  let component: ExtractpdfComponent;
  let fixture: ComponentFixture<ExtractpdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtractpdfComponent],
    });
    fixture = TestBed.createComponent(ExtractpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
