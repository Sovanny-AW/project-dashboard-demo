import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Gallary } from 'src/app/models/file-upload';
import { UploadMultiImageStore } from 'src/app/stores/uploadMultiImage.store';
import { v4 as uuidv4 } from 'uuid'
@Component({
  selector: 'app-add-upload-multi-images',
  templateUrl: './add-upload-multi-images.component.html',
  styleUrls: ['./add-upload-multi-images.component.scss']
})
export class AddUploadMultiImagesComponent implements OnInit {
  @ViewChild('photoFile') photoFile!: ElementRef;
  form!: FormGroup;
  SELECTED_FILES: any[] = [];
  START_UPLOAD: boolean = false;
  previews: any[] = [];
  task?: AngularFireUploadTask
  percentages?: Observable<number>

  title?: AbstractControl
  constructor(
    public dialogRef: MatDialogRef<AddUploadMultiImagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private db: AngularFireDatabase,
    private snackBar: MatSnackBar,
    public store: UploadMultiImageStore,
    public storage: AngularFireStorage,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }
  selectFile(event: any) {
    this.previews = []
    if (event && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const numberFiles = event.target.files[i]
        this.SELECTED_FILES.push(numberFiles)
        const reader = new FileReader;
        reader.onload = (event: any) => {

          const file = {
            name: numberFiles?.name || null,
            url: event.target?.result
          }
          this.previews.push(file)
        };
        reader.readAsDataURL(this.SELECTED_FILES[i])
      }
    }
  }
  async upload() {
    if (!this.previews || this.SELECTED_FILES && this.previews.length || this.SELECTED_FILES.length === 0) {
      alert("Please select any image to upload.")
    }
    else {
      const item = this.data;
      const key = this.db.createPushId()
      const data: any = {
        key: key,
        created_at: new Date(),
        files: item ? item.files : [],
        isDelete: false

      }
      if (this.SELECTED_FILES.length > 0) {
        const selectedFiles: any[] = item ? item.files || [] : [];
        const files = await this.store.upload(this.SELECTED_FILES);

        data.files = selectedFiles.concat(files);
        this.START_UPLOAD = false;
      }
      this.store.save(data, (success: any, res: any) => {
        if (success) {
          this.SELECTED_FILES = [];
          this.snackBar.open('Image has been uploaded', 'Done', { duration: 3000 })
          this.dialogRef.close()
        }
        else {
          alert(res)
        }
      })
    }
  }
  _removeFile(index: any, file: any) {
    this.SELECTED_FILES = this.SELECTED_FILES.filter(m => m.name !== file.name);
    this.previews = this.previews.filter(m => m !== this.previews[index])
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
