import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUploadImageComponent } from './add-upload-image.component';

describe('AddUploadImageComponent', () => {
  let component: AddUploadImageComponent;
  let fixture: ComponentFixture<AddUploadImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUploadImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
