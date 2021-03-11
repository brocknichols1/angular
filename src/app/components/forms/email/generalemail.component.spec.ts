import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralemailComponent } from './generalemail.component';

describe('GeneralemailComponent', () => {
  let component: GeneralemailComponent;
  let fixture: ComponentFixture<GeneralemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
