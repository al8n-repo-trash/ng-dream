import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiderSecondaryComponent } from './sider-secondary.component';

describe('SiderSecondaryComponent', () => {
  let component: SiderSecondaryComponent;
  let fixture: ComponentFixture<SiderSecondaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiderSecondaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiderSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
