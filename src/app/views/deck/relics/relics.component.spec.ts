import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelicsComponent } from './relics.component';

describe('RelicsComponent', () => {
  let component: RelicsComponent;
  let fixture: ComponentFixture<RelicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
