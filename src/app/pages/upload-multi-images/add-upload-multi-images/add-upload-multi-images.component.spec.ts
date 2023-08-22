import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUploadMultiImagesComponent } from './add-upload-multi-images.component';

describe('AddUploadMultiImagesComponent', () => {
  let component: AddUploadMultiImagesComponent;
  let fixture: ComponentFixture<AddUploadMultiImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUploadMultiImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUploadMultiImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
