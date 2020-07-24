import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharRunsComponent } from './char-runs.component';

describe('AllRunsComponent', () => {
  let component: CharRunsComponent;
  let fixture: ComponentFixture<CharRunsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharRunsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharRunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
