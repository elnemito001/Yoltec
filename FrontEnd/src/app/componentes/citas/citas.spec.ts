import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Citas } from './citas';

describe('Citas', () => {
  let component: Citas;
  let fixture: ComponentFixture<Citas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Citas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Citas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
