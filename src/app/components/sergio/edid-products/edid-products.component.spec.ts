import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdidProductsComponent } from './edid-products.component';

describe('EdidProductsComponent', () => {
  let component: EdidProductsComponent;
  let fixture: ComponentFixture<EdidProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdidProductsComponent]
    });
    fixture = TestBed.createComponent(EdidProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
