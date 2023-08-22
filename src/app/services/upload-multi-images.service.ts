import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadMultiImagesService {

  constructor(
    private db : AngularFireDatabase,
    private storage: AngularFireStorage,
    private afs : AngularFirestore,
  ) { }

  createId(){
    return this.db.createPushId()
  }
  uploadMultiImage(){
    return this.afs.collection('upload_multi_image');
  }
}
