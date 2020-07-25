import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeowComponent } from './neow.component';

describe('NeowComponent', () => {
  let component: NeowComponent;
  let fixture: ComponentFixture<NeowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
