import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMultifunctionalComponent } from './layout-multifunctional.component';

describe('LayoutMultifunctionalComponent', () => {
  let component: LayoutMultifunctionalComponent;
  let fixture: ComponentFixture<LayoutMultifunctionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutMultifunctionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutMultifunctionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
