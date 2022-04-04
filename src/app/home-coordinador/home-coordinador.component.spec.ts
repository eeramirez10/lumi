import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCoordinadorComponent } from './home-coordinador.component';

describe('HomeCoordinadorComponent', () => {
  let component: HomeCoordinadorComponent;
  let fixture: ComponentFixture<HomeCoordinadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCoordinadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCoordinadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
