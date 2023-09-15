import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutsComponent } from './layouts/dashboard-layouts/dashboard-layouts.component';
import { UploadImageComponent } from './pages/upload-image/upload-image.component';
import { UploadMultiImagesComponent } from './pages/upload-multi-images/upload-multi-images.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: '',redirectTo: 'home',pathMatch:'full'},
  {path: 'home',component : HomeComponent},
  {path : 'dashboard', component : DashboardLayoutsComponent, 
  children:[
    {path:'upload-image',component: UploadImageComponent},
    {path:'upload-multi-images',component:UploadMultiImagesComponent},
]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
