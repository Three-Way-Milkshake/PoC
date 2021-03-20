import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComebackComponent } from './comeback.component';

describe('ComebackComponent', () => {
  let component: ComebackComponent;
  let fixture: ComponentFixture<ComebackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComebackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
