import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarPerfilComponent } from './seleccionar-perfil.component';

describe('SeleccionarPerfilComponent', () => {
  let component: SeleccionarPerfilComponent;
  let fixture: ComponentFixture<SeleccionarPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
