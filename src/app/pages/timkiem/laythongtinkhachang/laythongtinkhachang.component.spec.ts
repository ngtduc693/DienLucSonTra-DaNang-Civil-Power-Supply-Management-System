import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaythongtinkhachangComponent } from './laythongtinkhachang.component';

describe('LaythongtinkhachangComponent', () => {
  let component: LaythongtinkhachangComponent;
  let fixture: ComponentFixture<LaythongtinkhachangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaythongtinkhachangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaythongtinkhachangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
