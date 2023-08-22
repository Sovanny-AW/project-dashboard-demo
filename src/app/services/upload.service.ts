import { Injectable } from '@angular/core';
import { FileUpload } from '../models/file-upload';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { finalize } from 'rxjs';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private basePath = '/uploads';

  constructor(
    private db : AngularFireDatabase,
    private storage: AngularFireStorage,
    private afs : AngularFirestore,
  ) { 

  }
  createId() {
    return this.db.createPushId();
}
  uploadSingleImage(){
    return this.afs.collection('image')
  }
  
  // uploadImage( fileUpload: FileUpload){
  //   const storageRef = ref(this.storage,`${this.basePath}/${fileUpload.file.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef,fileUpload.file);
  //   uploadTask.on('state_changed',
  // (snapshot) => {
  //   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //   console.log('Upload is ' + progress + '% done');
  // }),
  // ()=>{
  //   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //     console.log('File available at', downloadURL);
  //     fileUpload.url = downloadURL;
  //     fileUpload.name = fileUpload.file.name;
  //     this.saveFileData(fileUpload);
  //   });
  // }
  // }
  pushFileToStorage(fileUpload: any = []) {
    const selectedFiles: any[] = [];

    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          const files = {
            key: this.db.createPushId(),
            filename: filePath,
            name: fileUpload.file.name,
            downloadUrl: downloadURL,
          }
          // fileUpload.url = downloadURL;
          // fileUpload.name = fileUpload.file.name;
          selectedFiles.push(files)
          this.saveFileData(fileUpload);
        });
        
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }
  
  saveFileData(item: FileUpload): void {
    this.db.list(this.basePath)?.push(item)
  }
}
