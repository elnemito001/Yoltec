import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bitacora } from './bitacora';

describe('Bitacora', () => {
  let component: Bitacora;
  let fixture: ComponentFixture<Bitacora>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bitacora]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bitacora);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
