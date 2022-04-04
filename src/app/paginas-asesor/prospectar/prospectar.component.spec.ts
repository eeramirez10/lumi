import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectarComponent } from './prospectar.component';

describe('ProspectarComponent', () => {
  let component: ProspectarComponent;
  let fixture: ComponentFixture<ProspectarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspectarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
