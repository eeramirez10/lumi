import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectosCComponent } from './prospectos-c.component';

describe('ProspectosCComponent', () => {
  let component: ProspectosCComponent;
  let fixture: ComponentFixture<ProspectosCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspectosCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectosCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
