import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubmedAbstractsComponent } from './pubmed-abstracts.component';

describe('PubmedAbstractsComponent', () => {
  let component: PubmedAbstractsComponent;
  let fixture: ComponentFixture<PubmedAbstractsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PubmedAbstractsComponent]
    });
    fixture = TestBed.createComponent(PubmedAbstractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
