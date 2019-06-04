import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NdToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: NdToastComponent;
  let fixture: ComponentFixture<NdToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NdToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NdToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
