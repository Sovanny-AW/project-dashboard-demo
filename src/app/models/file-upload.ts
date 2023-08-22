export class FileUpload {
    key!: string;
    name!: string;
    url!: string;
    file!: File;
    constructor(file: File) {
      this.file = file;
    }
  }
  export class IImage{
    key?:string;
    image?:any;
    // downloadURL: string;
    // imageDownloadPath: string;
    // imageFileName: string;
    // imageFileType: string;
  
    created_at?: any;
    created_by?: any;
    updated_by?: any;
    updated_at?: any;
    page_key?: any;
  
    status?: any;
    isPublished?: boolean;
    isDelete?: boolean;
  }
  export interface Gallary{
    id : string,
    image : string;
    imagePath : string;
  }