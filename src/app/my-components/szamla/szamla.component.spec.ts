import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SzamlaComponent } from './szamla.component';

describe('SzamlaComponent', () => {
  let component: SzamlaComponent;
  let fixture: ComponentFixture<SzamlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SzamlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SzamlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
