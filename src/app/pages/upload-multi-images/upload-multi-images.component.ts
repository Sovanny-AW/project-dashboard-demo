import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUploadMultiImagesComponent } from './add-upload-multi-images/add-upload-multi-images.component';
import { UploadMultiImageStore } from 'src/app/stores/uploadMultiImage.store';

@Component({
  selector: 'app-upload-multi-images',
  templateUrl: './upload-multi-images.component.html',
  styleUrls: ['./upload-multi-images.component.scss']
})
export class UploadMultiImagesComponent implements OnInit {

  constructor(
    private dailog : MatDialog,
    public store : UploadMultiImageStore
  ) { }

  ngOnInit(): void {
    this.store.fetchImage()
  }

  create(){
    const dialogRef = this.dailog.open(AddUploadMultiImagesComponent,{
      width: '760px',
      height: '96vh',
      role: 'dialog'
    })
    dialogRef.updatePosition({top: '16px',right:'16px',bottom: '16px'})
  }

}
