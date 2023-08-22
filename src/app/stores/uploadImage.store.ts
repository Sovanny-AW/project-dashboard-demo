import { Injectable } from "@angular/core";
import { action, observable } from "mobx";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UploadService } from "../services/upload.service";
import { Observable, Subscription } from "rxjs";
import { AngularFireStorage } from "@angular/fire/compat/storage";
@Injectable({providedIn:'root'})
export class UploadImageStore {
    @observable public isLoading: boolean = false;
    constructor(
        private afs: AngularFirestore,
        private ds : UploadService,
        private storage: AngularFireStorage,
    ){}
    @action
    async addImage(image: any, callback: (isSuccess: boolean) => void){
          await this.afs.collection('images').doc(image.key).set(image).then(()=>{
            this.isLoading = false;
            callback(true);
          }).catch((e)=>{
            console.log(e);
            this.isLoading = false;
            callback(false);
          });
    
      }

   @action
   save(item:any,callback:any){
    this.isLoading = true;
    this.ds.uploadSingleImage().doc(item.key).set(item,{merge:true})
    .then(() => {
      callback(true,null);
    }).catch((er)=>{
      alert(er)
      callback(false,er)
    }).finally(()=>{
      this.isLoading =false
    })
   }


   @observable startUpload: boolean = false;
   @observable uploadPercent?: Observable<any>;

  @action
  async upload(fileItems: any[]) {
    const selectedFiles: any[] = [];

    for await (const file of fileItems) {
      this.startUpload = true;
      const soundPath = `/files/${this.ds.createId()}${file.name}`;
      const soundTask = this.uploadSelectedFile(file, soundPath);
      this.uploadPercent = soundTask.percentageChanges();
      const downloadURL: any = (await soundTask.then(async (f) => {
        return f.ref.getDownloadURL()
      }));
      let fileType = file.type.split('/').slice(0, -1).join('/');
      const files = {
        key: this.ds.createId(),
        filename: soundPath,
        name: file.name,
        downloadUrl: downloadURL,
        fileType: file.type,
        type: fileType,
        fileSize: file.size,
      }
      selectedFiles.push(files)
      this.startUpload = false;
    }

    return selectedFiles
  }
  uploadSelectedFile(file:any, filePath:any) {
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    return task
  }

  @observable data: any = [];
  @observable fetchImageRef! : Subscription;
  @action
  fetchImage(){
    this.fetchImageRef && this.fetchImageRef.unsubscribe()
    this.fetchImageRef = this.ds.uploadSingleImage().valueChanges().subscribe((res)=>{
      this.data = res
    })
  }
}