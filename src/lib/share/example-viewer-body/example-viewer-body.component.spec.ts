import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleViewerBodyComponent } from './example-viewer-body.component';

describe('ExampleViewerBodyComponent', () => {
  let component: ExampleViewerBodyComponent;
  let fixture: ComponentFixture<ExampleViewerBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleViewerBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleViewerBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
