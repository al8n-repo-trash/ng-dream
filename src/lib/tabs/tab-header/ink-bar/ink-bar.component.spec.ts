import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InkBarComponent } from './ink-bar.component';

describe('InkBarComponent', () => {
  let component: InkBarComponent;
  let fixture: ComponentFixture<InkBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InkBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InkBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
