import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTareaCComponent } from './editar-tarea-c.component';

describe('EditarTareaCComponent', () => {
  let component: EditarTareaCComponent;
  let fixture: ComponentFixture<EditarTareaCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTareaCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTareaCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
