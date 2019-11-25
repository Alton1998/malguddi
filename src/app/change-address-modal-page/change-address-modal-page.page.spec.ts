import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAddressModalPagePage } from './change-address-modal-page.page';

describe('ChangeAddressModalPagePage', () => {
  let component: ChangeAddressModalPagePage;
  let fixture: ComponentFixture<ChangeAddressModalPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeAddressModalPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAddressModalPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
