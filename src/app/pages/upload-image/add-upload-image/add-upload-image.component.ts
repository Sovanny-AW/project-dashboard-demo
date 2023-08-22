import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUpload, IImage } from 'src/app/models/file-upload';
import { UploadService } from 'src/app/services/upload.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UploadImageStore } from 'src/app/stores/uploadImage.store';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import * as firebase from 'firebase/compat/app';
@Component({
  selector: 'app-add-upload-image',
  templateUrl: './add-upload-image.component.html',
  styleUrls: ['./add-upload-image.component.scss']
})
export class AddUploadImageComponent implements OnInit {
@ViewChild('photoFile') photoFile!: ElementRef;

form! : FormGroup;
url : any;
percentage = 0;
SELECTED_PHOTO: any = null;
START_UPLOAD: boolean = false;
  constructor(
    public dialogRef : MatDialogRef<AddUploadImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public uploadService : UploadService,
    private snackBar : MatSnackBar,
    private store : UploadImageStore,
    private db : AngularFireDatabase,
  ) { }
  ngOnInit(): void {
  }

  selectFile(event:any){
    if(event && event.target.files[0]){
      this.SELECTED_PHOTO = event.target.files[0]
    const reader = new FileReader;
    reader.readAsDataURL(event.target.files[0])
    reader.onload = (event) =>{
      this.url = event.target?.result
    }
    this.photoFile.nativeElement.value = "";
    }
    
  }
  async upload(){
   
    const item = this.data;
    const key = this.db.createPushId()
    const data: any = {
      key : key,
      created_at : new Date(),
      photoFile:item ? item.photoFile : null,
      files: item ? item.files : [],
      isDelete: false

    }
    if (this.SELECTED_PHOTO) {
      this.START_UPLOAD = true;
      const file = await this.store.upload([this.SELECTED_PHOTO])
      data.photoFile = file[0];
      this.START_UPLOAD = false;
    }
    this.store.save(data,(success:any,res:any)=>{
      if(success){
        this.SELECTED_PHOTO = null;
        this.url = null;
        this.snackBar.open('Image has been uploaded', 'Done',{duration:3000})
        this.dialogRef.close()
      }
      else{
        alert(res)
      }
    })
  }
 
  
  closeDialog(){
    this.dialogRef.close()
  }
}

