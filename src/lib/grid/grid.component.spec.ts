import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NdGridColDirective } from './grid.directive';

describe('NdGridColDirective', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<NdGridColDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NdGridColDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NdGridColDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
