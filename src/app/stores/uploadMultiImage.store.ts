import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { action, observable } from "mobx";
import { Observable, Subscription } from "rxjs";
import { UploadMultiImagesService } from "../services/upload-multi-images.service";
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/compat/storage";

@Injectable({providedIn:'root'})
export class UploadMultiImageStore {
    @observable public isLoading: boolean = false;
    @observable image: any = null;

    constructor(
        private afs: AngularFirestore,
        private ds : UploadMultiImagesService,
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
    this.ds.uploadMultiImage().doc(item.key).set(item,{merge:true})
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
      const soundPath = `/files-multi/${this.ds.createId()}${file.name}`;
      const soundTask = this.uploadSelectedFile(file, soundPath);
      const fileType = file.type.split('/').slice(0, -1).join('/');

      this.uploadPercent = soundTask.percentageChanges();
      const downloadURL: any = (await soundTask.then(async (f) => {
        return f.ref.getDownloadURL()
      }));
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
    this.fetchImageRef = this.ds.uploadMultiImage().valueChanges().subscribe((res)=>{
      this.data = res
      console.log(' this.data', this.data);
      
    })
  }
}