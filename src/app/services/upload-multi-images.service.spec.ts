import { TestBed } from '@angular/core/testing';

import { UploadMultiImagesService } from './upload-multi-images.service';

describe('UploadMultiImagesService', () => {
  let service: UploadMultiImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadMultiImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
