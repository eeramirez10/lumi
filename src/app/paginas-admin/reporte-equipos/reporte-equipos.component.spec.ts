import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEquiposComponent } from './reporte-equipos.component';

describe('ReporteEquiposComponent', () => {
  let component: ReporteEquiposComponent;
  let fixture: ComponentFixture<ReporteEquiposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEquiposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
