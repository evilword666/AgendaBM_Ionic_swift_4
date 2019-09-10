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
import { ModalPageModule } from './modal/modal.module';
import { ModalExpedientePageModule } from './modal-expediente/modal-expediente.module';

import { NavController, NavParams } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { VideoAsistenciaComponent } from './video-asistencia/video-asistencia.component';

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { DatabaseService } from './providers/database/database.service';


import { NgCalendarModule  } from 'ionic2-calendar';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';



import { LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeMx from '@angular/common/locales/es-MX';
import { EsperaComponent } from './espera/espera.component';
registerLocaleData(localeMx);



@NgModule({
    declarations: [AppComponent, UserVideoComponent, OpenViduVideoComponent, VideoAsistenciaComponent, EsperaComponent],
    entryComponents: [],
    imports: [
        BrowserModule, 
        FormsModule, 
        IonicModule.forRoot(), 
        HttpClientModule,
        HttpModule,
        AppRoutingModule,
        ModalPageModule,
        ModalExpedientePageModule,
        NgCalendarModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        AndroidPermissions,
        SQLite,        
        SQLitePorter,
        UniqueDeviceID,
        BackgroundMode,
        LocalNotifications,
        NativeAudio,
        DatabaseService,
        NavController,
        Push,
        { provide: LOCALE_ID, useValue: 'es-MX' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
