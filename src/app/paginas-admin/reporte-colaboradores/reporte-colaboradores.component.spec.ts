import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteColaboradoresComponent } from './reporte-colaboradores.component';

describe('ReporteColaboradoresComponent', () => {
  let component: ReporteColaboradoresComponent;
  let fixture: ComponentFixture<ReporteColaboradoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteColaboradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
