import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonDuelistRunComponent } from './non-duelist-run.component';

describe('AllRunListComponent', () => {
  let component: NonDuelistRunComponent;
  let fixture: ComponentFixture<NonDuelistRunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonDuelistRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonDuelistRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
