import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBodyComponent } from './modal-body.component';

describe('BoardDialogComponent', () => {
  let component: ModalBodyComponent;
  let fixture: ComponentFixture<ModalBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
