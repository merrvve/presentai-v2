import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextToPresentaitonComponent } from './text-to-presentaiton.component';

describe('TextToPresentaitonComponent', () => {
  let component: TextToPresentaitonComponent;
  let fixture: ComponentFixture<TextToPresentaitonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextToPresentaitonComponent],
    });
    fixture = TestBed.createComponent(TextToPresentaitonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
