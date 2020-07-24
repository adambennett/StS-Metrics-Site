import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRunsComponent } from './all-runs.component';

describe('AllRunsComponent', () => {
  let component: AllRunsComponent;
  let fixture: ComponentFixture<AllRunsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRunsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
