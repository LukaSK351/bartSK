import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheImageComponent } from './the-image.component';

describe('TheImageComponent', () => {
  let component: TheImageComponent;
  let fixture: ComponentFixture<TheImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
