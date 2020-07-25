import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunViewerComponent } from './run-viewer.component';

describe('RunViewerComponent', () => {
  let component: RunViewerComponent;
  let fixture: ComponentFixture<RunViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
