import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrecciaComponent } from './freccia.component';

describe('FrecciaComponent', () => {
  let component: FrecciaComponent;
  let fixture: ComponentFixture<FrecciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrecciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrecciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
