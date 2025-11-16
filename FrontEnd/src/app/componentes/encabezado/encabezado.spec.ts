import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Encabezado } from './encabezado.component';

describe('Encabezado', () => {
  let component: Encabezado;
  let fixture: ComponentFixture<Encabezado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Encabezado]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Encabezado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
