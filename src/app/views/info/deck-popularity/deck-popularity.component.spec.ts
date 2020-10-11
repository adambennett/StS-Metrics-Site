import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckPopularityComponent } from './deck-popularity.component';

describe('DeckPopularityComponent', () => {
  let component: DeckPopularityComponent;
  let fixture: ComponentFixture<DeckPopularityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckPopularityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckPopularityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
