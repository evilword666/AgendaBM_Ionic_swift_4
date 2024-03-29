import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VideoAsistenciaComponent } from './video-asistencia/video-asistencia.component';
const routes: Routes = [

  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  

  { path: 'Login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'VideoAsistencia', component: VideoAsistenciaComponent},   
  { path: 'Modal', loadChildren: './modal/modal.module#ModalPageModule' },
  { path: 'Demo', loadChildren: './demo/demo.module#DemoPageModule' }
 

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
