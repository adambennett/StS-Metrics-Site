import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunCountCountryComponent } from './run-count-country.component';

describe('RunCountCountryComponent', () => {
  let component: RunCountCountryComponent;
  let fixture: ComponentFixture<RunCountCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunCountCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunCountCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
