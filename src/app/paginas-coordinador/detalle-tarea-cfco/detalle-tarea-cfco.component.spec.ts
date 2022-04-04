import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTareaCFCOComponent } from './detalle-tarea-cfco.component';

describe('DetalleTareaCFCOComponent', () => {
  let component: DetalleTareaCFCOComponent;
  let fixture: ComponentFixture<DetalleTareaCFCOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleTareaCFCOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTareaCFCOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
