import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTareaCFComponent } from './detalle-tarea-cf.component';

describe('DetalleTareaCFComponent', () => {
  let component: DetalleTareaCFComponent;
  let fixture: ComponentFixture<DetalleTareaCFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleTareaCFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTareaCFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
