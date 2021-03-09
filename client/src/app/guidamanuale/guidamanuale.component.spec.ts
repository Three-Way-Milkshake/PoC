import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidamanualeComponent } from './guidamanuale.component';

describe('GuidamanualeComponent', () => {
  let component: GuidamanualeComponent;
  let fixture: ComponentFixture<GuidamanualeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuidamanualeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidamanualeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
