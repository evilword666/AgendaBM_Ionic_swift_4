import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { OpenVidu, Publisher, Session, StreamEvent, StreamManager, Subscriber } from 'openvidu-browser';
import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
declare var cordova;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
})
export class AppComponent implements OnDestroy {
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }



    //rootPage:any = OpenviduVideoAsistenciaComponent;

    constructor(private statusBar: StatusBar, private platform: Platform){

      this.statusBar.backgroundColorByHexString('#989aa2');
      this.statusBar.overlaysWebView(false);

        this.platform.ready().then(() => {

       
          });
        
        
    }

}
