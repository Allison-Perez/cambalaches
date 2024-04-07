import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeUsComponent } from './we-us.component';

describe('WeUsComponent', () => {
  let component: WeUsComponent;
  let fixture: ComponentFixture<WeUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeUsComponent]
    });
    fixture = TestBed.createComponent(WeUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
