import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { OpenViduVideoComponent } from './video-asistencia/ov-video.component';
import { UserVideoComponent } from './video-asistencia/user-video.component';

import { AppRoutingModule } from './app-routing.module';
import { VideoAsistenciaComponent } from './video-asistencia/video-asistencia.component';



@NgModule({
    declarations: [AppComponent, UserVideoComponent, OpenViduVideoComponent, VideoAsistenciaComponent],
    entryComponents: [],
    imports: [
        BrowserModule, 
        FormsModule, 
        IonicModule.forRoot(), 
        HttpClientModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        AndroidPermissions
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
