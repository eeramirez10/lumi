import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficageneralComponent } from './graficageneral.component';

describe('GraficageneralComponent', () => {
  let component: GraficageneralComponent;
  let fixture: ComponentFixture<GraficageneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficageneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficageneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
