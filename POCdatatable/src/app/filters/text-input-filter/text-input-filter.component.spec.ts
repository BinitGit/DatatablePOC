import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputFilterComponent } from './text-input-filter.component';

describe('TextInputFilterComponent', () => {
  let component: TextInputFilterComponent;
  let fixture: ComponentFixture<TextInputFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextInputFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
