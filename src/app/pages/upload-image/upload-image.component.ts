import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUploadImageComponent } from './add-upload-image/add-upload-image.component';
import { UploadImageStore } from 'src/app/stores/uploadImage.store';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  constructor(
    private dailog : MatDialog,
    public store : UploadImageStore
  ) { }

  ngOnInit(): void {
    this.store.fetchImage()
  }

  create(){
    const dialogRef = this.dailog.open(AddUploadImageComponent,{
      width: '760px',
      height: '96vh',
      role: 'dialog'
    })
    dialogRef.updatePosition({top: '16px',right:'16px',bottom: '16px'})
  }
}
