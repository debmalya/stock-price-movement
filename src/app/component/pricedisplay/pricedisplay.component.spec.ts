import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricedisplayComponent } from './pricedisplay.component';

describe('PricedisplayComponent', () => {
  let component: PricedisplayComponent;
  let fixture: ComponentFixture<PricedisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricedisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricedisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
