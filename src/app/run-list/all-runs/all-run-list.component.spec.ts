import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRunListComponent } from './all-run-list.component';

describe('AllRunListComponent', () => {
  let component: AllRunListComponent;
  let fixture: ComponentFixture<AllRunListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRunListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRunListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
