import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoltsegtipusComponent } from './koltsegtipus.component';

describe('KoltsegtipusComponent', () => {
  let component: KoltsegtipusComponent;
  let fixture: ComponentFixture<KoltsegtipusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoltsegtipusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoltsegtipusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
