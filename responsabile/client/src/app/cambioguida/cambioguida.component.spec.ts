import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioguidaComponent } from './cambioguida.component';

describe('CambioguidaComponent', () => {
  let component: CambioguidaComponent;
  let fixture: ComponentFixture<CambioguidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambioguidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioguidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
