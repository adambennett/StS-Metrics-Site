import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLookupComponent } from './card-lookup.component';

describe('CardLookupComponent', () => {
  let component: CardLookupComponent;
  let fixture: ComponentFixture<CardLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
